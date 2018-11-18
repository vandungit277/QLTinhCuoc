$(document).ready(function () {
    $("#grid").hide();
    var data = [
        {
            "ID": 0,
            "Name": "Tất cả"
        },
        {
            "ID": 1,
            "Name": "Groups"
        }
    ];
    showoroff(false);
    $("#idopsearch").kendoDropDownList({
        dataTextField: "Name",
        dataValueField: "ID",
        dataSource: data,
        change: function (e) {
            if (this.value() == 1) {
                GetGroups();
                showoroff(true);
            } 
            else {
                showoroff(false);
            }
        }
    });
  
    $("#idbtnsearch").click(function () {
        var search = $("#idopsearch").data("kendoDropDownList").dataItem().ID;
        var groupsId = 0;
        if (search==1) {
            groupsId = $("#idgroup").data("kendoDropDownList").dataItem().GroupsID;
        }
       
        var user = $("#iduser").val();
       var data = {
           "Search": search, "GroupsID": groupsId, "UserName": user
        };
        ListGroupStaffDetail(data);
    });
    $(document).keypress(function (e) {
        if (e.which == 13) {
            $("#idbtnsearch").click();
        }
    });
});

function GetGroups() {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/CallDropDown/DropDown/Call_GetGroups",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(data),
        success: function (resultData) {
            $("#idgroup").kendoDropDownList({
                dataTextField: "GroupsName",
                dataValueField: "GroupsID",
                dataSource: resultData
            });
        },
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3 + " " + p4;
            if (xhr.responseText && xhr.responseText[0] == "{")
                err = JSON.parse(xhr.responseText).Message;
            alert().text(err);
        }
    });
}

function ListGroupStaffDetail(data) {
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/CallGroup/Group/Call_GetGroupStaffDetail",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (resultData) {
            var leght = resultData.length;
            if (leght > 0) {
                $("#idinfo").html('<p style=" color: green "> Tìm thấy: ' + leght + ' </p>');
                $("#grid").show();
                initLoadgird(resultData);
            } else {
                $("#grid").hide();
                $("#idinfo").html('<p style=" color: red ">Không tìm thấy dữ liệu</p>');
            }
        },
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3 + " " + p4;
            if (xhr.responseText && xhr.responseText[0] == "{")
                err = JSON.parse(xhr.responseText).Message;
            alert().text(err);
        }
    });
}
//todo: show thông tin 
function initLoadgird(data) {
    var gridDataSource = new window.kendo.data.DataSource({
        type: "odata",
        data: data,
        schema: {
            model: {
                fields: {
                    GroupsID: { type: "string", editable: false, nullable: true },
                    StaffID: { type: "int", editable: false, nullable: true },
                    GroupsName: { type: "string", editable: false, nullable: true },
                    Status: { type: "int", editable: false, nullable: true }
                }
            }
        },
        pageSize: 20
    });

    window.$("#grid").kendoGrid({
        dataSource: gridDataSource,
        filterable: filterable(),
        sortable: true,
        pageable: {
            refresh: true, pageSizes: true
        },
        autosizerows: true,
        scrollable: false,
        resizable: true,
        dataBinding: function (e) {
            STT = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
            {
                title: "STT",
                width: 60,
                headerAttributes: {
                    "class": "table-header-cell"
                    , style: "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: {
                    "class": "table-cell",
                    style: "text-align:center"
                },
                //template: "<p class='row-number'></p>"
                template: "#= ++STT #"
            },
            {
                field: "GroupsID",
                hidden: true,
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }

            },
            {
                field: "StaffID",
                hidden: true,
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }

            }
            ,
            {
                field: "GroupsName",
                title: "Groups",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
            },
            {
                field: "Status",
                title: "TÌNH TRẠNG",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
                ,template: "#if(Status==1){#<span style='color:green;'>Kích hoạt</span>#}else{#<span style='color:red;'>OFF</span>#}#"

            },

            {
                filterable: false,
                attributes: { style: "text-align:center;" },
                template: "<button class='cursor' onclick=\"OnOfGroup(this)\">#if(Status==1){#<span style='color:red;'>OFF</span>#}else{#<span style='color:green;'>Kích hoạt</span>#}#</button>"
            }

        ]//, editable: true //cho phép sửa cột*/

    });

}
//tìm kiếm trên lưới
function filterable() {
    return {
        extra: false,
        messages: {
            info: "Điều kiện lọc:",
            clear: 'Xóa',
            filter: 'Lọc',
            checkAll: "Chọn tất cả"
        },
        operators: {
            string: {
                contains: "Chứa",
                startswith: "Bắt đầu bằng",
                eq: "Bằng",
                neq: "Không bằng"
            },
            number: {
                eq: "Bằng",
                neq: "Không bằng",
                gte: "Lớn hơn hoặc bằng",
                gt: "Lớn hơn",
                lte: "Nhỏ hơn hoặc bằng",
                lt: "Nhỏ hơn"
            },
            date: {
                eq: "Bằng",
                neq: "Không bằng",
                gte: "Lớn hơn hoặc bằng",
                gt: "Lớn hơn",
                lte: "Nhỏ hơn hoặc bằng",
                lt: "Nhỏ hơn"
            }
        }
    };
}
//Hiện thi hoặc ẩn
function showoroff(val) {
    if (val == false) {
        $("#trgroup").hide();
    } else {
        $("#trgroup").show();
    }
    
}

//todo Cập nhật tình trạng Packages
function OnOfGroup(element) {

    var notificationWidget = $("#notification").kendoNotification().data("kendoNotification");
    var tr = $(element).closest("tr");
    var grid = $("#grid").data("kendoGrid");
    // lấy data row
    var row = grid.dataItem(tr);
    var vNrow, st;
    if (row.Status == 0) {
        vNrow = "Kích hoạt";
        st = 1;
    } else {
        vNrow = "OFF";
        st = 0;
    }
    var data = { "GroupsID": row.GroupsID, "StaffID": row.StaffID, "Status": st, "UpdateBy": "System", "Description": row.GroupsName }
    kendo.confirm("Bạn có muốn " + vNrow + " Group này?").then(function () {
        window.$.ajax({
            url: "/CallGroup/Group/Call_IUGroupStaffDetail",
            type: "Post",
            dataType: "json",
            data: data,
            async: true,
            success: function (data) {
                if (data.Code == 1) {
                    if (row.Status == 0) {
                        row.Status = 1;
                    } else {
                        row.Status = 0;
                    }
                    //  alert(data[0].Desc);
                    notificationWidget.show(data.Desc, "success");
                    // tải lại grid
                    grid.refresh();
                } else {
                    //alert(data[0].Desc);
                    notificationWidget.show(data.Desc, "error");
                }
            },
            error: function (xhr, status, p3, p4) {
                //hide loading
                window.kendo.ui.progress(element, false);
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] === "{")
                    err = JSON.parse(xhr.responseText).Message;
                alert(err);
            }
        });
    }, function () {
       // kendo.alert("You chose to Cancel action.");
    });
}

//notification
function getNotificationMessage(val) {
    return {
        myMessage: val
    }
}