$(document).ready(function () {
    $("#dvExportGrid").hide();
    var data = [
        {
            "ID": 0,
            "Name": "Tất cả"
        },
        {
            "ID": 1,
            "Name": "Tỉnh/TP"
        },
        {
            "ID": 2,
            "Name": "Loại Phone"
        },
        {
            "ID": 3,
            "Name": "Theo đầu số"
        }
    ];
    showoroff(false);
    $("#idopsearch").kendoDropDownList({
        dataTextField: "Name",
        dataValueField: "ID",
        dataSource: data,
        change: function (e) {
            if (this.value() == 1) {
                GetLocation();           
                showoroff(true);
                $("#trtypefixeddial").hide();
            } else if (this.value() == 2) {
                GetTypeFixedDialName();
                showoroff(true);
                $("#trlocation").hide();
            }

            else if (this.value() == 3) {
                showoroff(false);
                $("#trtext").show();
            }
            else {
                showoroff(false);
            }
        }
    });

    var data2 = [
        {
            "ID": 0,
            "Name": "Tất cả"
        },
        {
            "ID": 1,
            "Name": " Đầu số"
        }
    ];

    $("#idsearchFixedDial").kendoDropDownList({
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
        },value:1
    });

    $("#idbtnsearch").click(function () {
        var search = $("#idopsearch").data("kendoDropDownList").dataItem().ID;
        var postalCode = $("#idtext").val();
        var locationId = "";
        var typeFixedDialId = "";
        
        if (search == 1) {
            locationId = $("#idlocation").data("kendoDropDownList").dataItem().LocationID;
          
             if (postalCode == "" && $("#idsearchFixedDial").data("kendoDropDownList").dataItem().ID == 1) {
                 alert("Vui lòng nhập Đầu số");
                 return;
             }
        } else if (search == 2) {
            typeFixedDialId = $("#idtypefixeddial").data("kendoDropDownList").dataItem().TypeFixedDialID;
            if (postalCode == "" && $("#idsearchFixedDial").data("kendoDropDownList").dataItem().ID == 1) {
                alert("Vui lòng nhập Đầu số");
                return;
            }
        }
        else {
             locationId = "";
             typeFixedDialId = "";
             
        }
        if ($("#idsearchFixedDial").data("kendoDropDownList").dataItem().ID == 0 && locationId != "" || $("#idsearchFixedDial").data("kendoDropDownList").dataItem().ID == 0 && typeFixedDialId != "") {
            postalCode = "";
        }

        var data = {
            "Search": search, "PostalCode": postalCode, "LocationID": locationId, "TypeFixedDialID": typeFixedDialId
        };
        CallListFixedDial(data);
    });
    $(document).keypress(function (e) {
        if (e.which == 13) {
            $("#idbtnsearch").click();
        }
    });
});

function GetTypeFixedDialName() {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/CallDropDown/DropDown/Call_GetTypeFixedDialName",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(data),
        success: function (resultData) {

            $("#idtypefixeddial").kendoDropDownList({
                dataTextField: "TypeFixedDialName",
                dataValueField: "TypeFixedDialID",
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

function GetLocation() {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/CallDropDown/DropDown/Call_GetLocation",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(data),
        success: function (resultData) {

            $("#idlocation").kendoDropDownList({
                dataTextField: "LocationName",
                dataValueField: "LocationID",
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

function CallListFixedDial(data) {
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/CallFixedDial/FixedDial/Call_ListFixedDial",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (resultData) {
            var leght = resultData.length;
            if (leght > 0) {
                $("#idinfo").html('<p style=" color: green "> Tìm thấy: ' + leght + ' </p>');
                $("#dvExportGrid").show();
                initLoadgird(resultData);
            } else {
                $("#dvExportGrid").hide();
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
                    LocationName: { type: "string", editable: false, nullable: true },
                    TypeFixedDialName: { type: "string", editable: false, nullable: true },
                    PostalCode: { type: "string", editable: false, nullable: true },
                    CreateBy: { type: "string", editable: false, nullable: true },
                    Description: { type: "string", editable: false, nullable: true }
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
                field: "LocationName",
                title: "Tỉnh/TP",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }

            }
            ,
            {
                field: "TypeFixedDialName",
                title: "Loại phone",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
            },
            {
                field: "PostalCode",
                title: "Đầu số",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
               

            },
            {
                field: "CreateBy",
                title: "Người tạo",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
            },
            {
                field: "Description",
                title: "Mô tả",
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
//Hiện thi hoặc ẩn
function showoroff(val) {
    if (val == false) {
        $("#trtypefixeddial").hide();
        $("#trlocation").hide();
        $("#trsearchFixedDial").hide();
        $("#trtext").hide();
    } else {
        $("#trtypefixeddial").show();
        $("#trlocation").show();     
        $("#trsearchFixedDial").show();
        $("#trtext").show();
    }
    
}


//todo khu vực xuất excel
// Xuất Excel
$(document).on("click", "#ExportGrid1", function () {


    var grid = $("#grid").data("kendoGrid");

    var rows = [{
        cells: [
            {
                value: "STT"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true

            }
            , {
                value: "Tỉnh/TP"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Loại Phone"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Đầu số"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Người tạo"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Mô tả"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
        ]
    }];
    //var trs = $("#grid").find('tr');

    var trs = grid.dataSource;

    var filteredDataSource = new kendo.data.DataSource({
        data: trs.data(),
        filter: trs.filter()
    });

    filteredDataSource.read();
    var data = filteredDataSource.view();

    for (var i = 0; i < data.length; i++) {

        var dataItem = data[i];
        var stt = i + 1;
        rows.push({
            cells: [
                { value: stt }
                , { value: dataItem.LocationName }
                , { value: dataItem.TypeFixedDialName }
                , { value: dataItem.PostalCode }
                , { value: dataItem.CreateBy }
                , { value: dataItem.Description }
            ]
        });
    }
    excelExport(rows);
});

function excelExport(rows) {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [
            {
                columns: [
                    { autoWidth: true }
                    , { autoWidth: true }
                    , { autoWidth: true }
                    , { autoWidth: true }
                    , { autoWidth: true }
                    , { autoWidth: true }
                ],
                title: "Danh sách đầu số",
                rows: rows
            }
        ]
    });

    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Danh sach dau so.xlsx" });

}