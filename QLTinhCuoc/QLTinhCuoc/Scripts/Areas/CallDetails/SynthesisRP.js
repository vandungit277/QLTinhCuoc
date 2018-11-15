$(document).ready(function () {
   
    var data2 = [
        {
            "ID": 0,
            "Name": "Tất cả"
        },
        {
            "ID": 1,
            "Name": " Tên nhân viên"
        }
    ];

    $("#idsearchstaff").kendoDropDownList({
        dataTextField: "Name",
        dataValueField: "ID",
        dataSource: data2,
        change: function (e) {
            if (this.value() == 0) {
                $("#trtext").hide();
                $("#idtext").val("");
            } else {
                $("#trtext").show();
            }
        }, value: 1
    });

    var data = [
        {
            "ID": 0,
            "Name": "Tất cả"
        },
        {
            "ID": 1,
            "Name": "Nhân viên"
        },
        {
            "ID": 2,
            "Name": "Công ty"
        },
        {
            "ID": 3,
            "Name": "Chi nhánh"
        },
        {
            "ID": 4,
            "Name": "Phòng ban"
        }
    ];
    showoroff(false);
    $("#idopsearch").kendoDropDownList({
        dataTextField: "Name",
        dataValueField: "ID",
        dataSource: data,
        change: function (e) {
            if (this.value() == 1) {
                showoroff(this.value());
            }else
                if (this.value() == 2 || this.value() == 3 || this.value() == 4) {
                getCompany(this.value());
                showoroff(this.value());
            } 
            else {
              showoroff(this.value());
            }
        }
    });

   



   
    $("#iddtfrom").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        change: function () {    
            //$("#iddtto").kendoDatePicker({
            //    value: this.value(),
            //    format: "dd/MM/yyyy",
            //    min: this.value()
            //});
           
        }
    });
    $("#iddtto").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy"
        //min: $("#iddtfrom").val()
    });
    $("#idbtnsearch").click(function () {
        var search = $("#idopsearch").data("kendoDropDownList").dataItem().ID;
        var username = $("#idtext").val();
        var conpanyId = "";
        var branchId = "";
        var departmentId = "";
        if (search == 1) {
            if (username == "" && $("#idsearchstaff").data("kendoDropDownList").dataItem().ID == 1) {
                alert("Vui lòng nhập UserName");
                return;
            }
        } else if (search == 2) {
            conpanyId = $("#idcompany").data("kendoDropDownList").dataItem().CompanyID;
          if (username == "" && $("#idsearchstaff").data("kendoDropDownList").dataItem().ID == 1) {
                alert("Vui lòng nhập UserName");
                return;
            }
        } else if (search == 3) {
            conpanyId = $("#idcompany").data("kendoDropDownList").dataItem().CompanyID;
            branchId = $("#idbranch").data("kendoDropDownList").dataItem().BranchID;
            if (username == "" && $("#idsearchstaff").data("kendoDropDownList").dataItem().ID == 1) {
                alert("Vui lòng nhập UserName");
                return;
            }
        } else if (search == 4) {
            conpanyId = $("#idcompany").data("kendoDropDownList").dataItem().CompanyID;
            branchId = $("#idbranch").data("kendoDropDownList").dataItem().BranchID;
            departmentId = $("#iddepartment").data("kendoDropDownList").dataItem().DepartmentID;
            if (username == "" && $("#idsearchstaff").data("kendoDropDownList").dataItem().ID == 1) {
                alert("Vui lòng nhập UserName");
                return;
            }
        }
        else {
            conpanyId = "";
            branchId = "";
            departmentId = "";
        }
        if ($("#idsearchstaff").data("kendoDropDownList").dataItem().ID == 0 && conpanyId != "") {
            username = "";
        }

        var data = {
            "Search": search, "UserName": username, "CompanyID": conpanyId, "BranchID": branchId, "DepartmentID": departmentId, "FromDate": $("#iddtfrom").val(), "ToDate": $("#iddtto").val()
        };
        ListSyntheisRP(data);
    });
    $(document).keypress(function (e) {
        if (e.which == 13) {
            $("#idbtnsearch").click();
        }
    });
});
function getCompany(val) {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/CallDropDown/DropDown/Call_GetCompany",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(data),
        success: function (resultData) {

            $("#idcompany").kendoDropDownList({
                dataTextField: "CompanyName",
                dataValueField: "CompanyID",
                dataSource: resultData,
                change: function (e) {
                    GetBrach(this.value());
                }
            });
            if (val == 3 || val ==4) {
                GetBrach($("#idcompany").data("kendoDropDownList").dataItem().CompanyID,val);
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

function GetBrach(companyId,val) {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/CallDropDown/DropDown/Call_GetBrach?companyId=" + companyId,
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(data),
        success: function (resultData) {

            $("#idbranch").kendoDropDownList({
                dataTextField: "BranchName",
                dataValueField: "BranchID",
                dataSource: resultData,
                change: function (e) {
                    GetDepartment(this.value());
                }
            });
            if (val == 4) {
                GetDepartment($("#idbranch").data("kendoDropDownList").dataItem().BranchID);
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

function GetDepartment(branchid) {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/CallDropDown/DropDown/Call_GetDepartment?branchId=" + branchid,
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(data),
        success: function (resultData) {

            $("#iddepartment").kendoDropDownList({
                dataTextField: "DepartmentName",
                dataValueField: "DepartmentID",
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


function ListSyntheisRP(data) {
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/CallDetails/CallDetails/Call_ListSynthesisRP",
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
                $("#idinfo").html('<p style=" color: red ">Không tìm thấy dữ liệu</p>');
                $("#grid").hide();
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
                    UserName: { type: "string", editable: false, nullable: true },
                    TotalTimeCalled: { type: "string", editable: false, nullable: true },
                    Total: { type: "string", editable: false, nullable: true },
                    BranchName: { type: "string", editable: false, nullable: true },
                    DepartmentName: { type: "string", editable: false, nullable: true },
                    CompanyName: { type: "string", editable: false, nullable: true }
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
                field: "UserName",
                title: "Tài khoản",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }

            },
            {
                field: "TotalTimeCalled",
                title: "Thời gian",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
            },
            {
                field: "Total",
                title: "Tổng tiền",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
                //, template: "#if(Status=='Enable'){#<span style='color:green;'>Enable</span>#}else{#<span style='color:red;'>Disable</span>#}#"

            },
            {
                field: "BranchName",
                title: "Chi nhánh",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
                //, template: "#if(Status=='Enable'){#<span style='color:green;'>Enable</span>#}else{#<span style='color:red;'>Disable</span>#}#"

            },
            {
                field: "DepartmentName",
                title: "Phòng ban",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
                //, template: "#if(Status=='Enable'){#<span style='color:green;'>Enable</span>#}else{#<span style='color:red;'>Disable</span>#}#"

            },
            {
                field: "CompanyName",
                title: "Công ty",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
                //, template: "#if(Status=='Enable'){#<span style='color:green;'>Enable</span>#}else{#<span style='color:red;'>Disable</span>#}#"

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

function CheckDate(date, id) {
    $("#idbtnsearch").prop("disabled", true);
    if (date.length == 10) {
        var strDate = date.split("/");
        if (strDate[0].length == 2 && strDate[1].length == 2 && strDate[2].length == 4) {
            if (strDate[0] > 31) {
                $("#idinfo").html('<p style=" color: red ">Định dạng ngày sai (<=31). Vui lòng nhập lại!</p>');
                $("#" + id + "").focus();
                return;
            } else
            if (strDate[1] > 12) {
                $("#idinfo").html('<p style=" color: red ">Định dạng tháng sai (<=12). Vui lòng nhập lại!</p>');
                $("#" + id + "").focus();
                return;
            } else
            if (strDate[1] == 2 && strDate[0] > 29) {
                $("#idinfo").html('<p style=" color: red ">Định dạng ngày tháng sai (Tháng " + strDate[1] + "ngày" + strDate[0] + "). Vui lòng nhập lại!</p>');
                $("#" + id + "").focus();
                return;
            }
            else {
                $("#idinfo").html('<p style=" color: red "></p>');
                $("#idbtnsearch").prop("disabled", false);
                return;
            }

        }
        else {
            $("#idinfo").html('<p style=" color: red ">Định dạng ngày tháng năm sai (DD/MM/YYYY). Vui lòng nhập lại!</p>');
            $("#" + id + "").focus();
            return;
        }
    }
    else {
        $("#idinfo").html('<p style=" color: red ">Định dạng ngày tháng năm sai (DD/MM/YYYY). Vui lòng nhập lại!</p>');
        $("#" + id + "").focus();
        return;
    }
}
//Hiện thi hoặc ẩn
function showoroff(val) {
    var txt = $("#idsearchstaff").data("kendoDropDownList").dataItem().ID;
    if (val ==1 ) {//nhân viên
        $("#trcompany").hide();
        $("#trbranch").hide();
        $("#trdepartment").hide();
        $("#trsearchstaff").show();
        if (txt== 0) {
            $("#trtext").hide();
        } else {
            $("#trtext").show();
        }
      
    } else if (val == 2) {//công ty
        $("#trcompany").show();
        $("#trbranch").hide();
        $("#trdepartment").hide();
        $("#trsearchstaff").show();
        if (txt == 0) {
            $("#trtext").hide();
        } else {
            $("#trtext").show();
        }
    }
    else if (val == 3) {//chi nhánh
        $("#trcompany").show();
        $("#trbranch").show();
        $("#trdepartment").hide();
        $("#trsearchstaff").show();
        if (txt == 0) {
            $("#trtext").hide();
        } else {
            $("#trtext").show();
        }
    }
    else if (val == 4) {//phòng ban
        $("#trcompany").show();
        $("#trbranch").show();
        $("#trdepartment").show();
        $("#trsearchstaff").show();
        if (txt == 0) {
            $("#trtext").hide();
        } else {
            $("#trtext").show();
        }
    }else
    if (val == 0) {
        $("#trcompany").hide();
        $("#trbranch").hide();
        $("#trdepartment").hide();
        $("#trsearchstaff").hide();
        $("#trtext").hide();
    }

}