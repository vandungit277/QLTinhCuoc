$(document).ready(function () {
   
    $("#dvExportGrid").hide();
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
       var data = {
            "Search": 3, "FromDate": $("#iddtfrom").val(), "ToDate": $("#iddtto").val()
        };
        ListManagementLocal(data);
    });
    $(document).keypress(function (e) {
        if (e.which == 13) {
            $("#idbtnsearch").click();
        }
    });
});



function ListManagementLocal(data) {
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/CallManagement/Management/Call_ListManagement",
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
                    UserName: { type: "string", editable: false, nullable: true },
                    From: { type: "string", editable: false, nullable: true },
                    To: { type: "string", editable: false, nullable: true },
                    TotalTimeCalled: { type: "string", editable: false, nullable: true },
                    Total: { type: "string", editable: false, nullable: true },
                    LocationNameFrom: { type: "string", editable: false, nullable: true },
                    LocationNameTo: { type: "string", editable: false, nullable: true },
                    TypeFixedDialName: { type: "string", editable: false, nullable: true }
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

            }
            ,
            {
                field: "From",
                title: "Từ",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
            },
            {
                field: "To",
                title: "Đến",
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
                field: "LocationNameFrom",
                title: "Từ Tỉnh/TP",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
                //, template: "#if(Status=='Enable'){#<span style='color:green;'>Enable</span>#}else{#<span style='color:red;'>Disable</span>#}#"

            },
            {
                field: "LocationNameTo",
                title: "Đến Tỉnh/TP",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
                //, template: "#if(Status=='Enable'){#<span style='color:green;'>Enable</span>#}else{#<span style='color:red;'>Disable</span>#}#"

            },
            {
                field: "TypeFixedDialName",
                title: "Loại phone",
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
                value: "Tài khoản"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Từ"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Đến"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Tổng thời gian gọi"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Tổng tiền"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Từ Tỉnh/TP"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Đến Tỉnh/TP"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }, {
                value: "Loại Phone"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }/*
          , {
              value: "Trạng thái thanh toán"
              , color: "#ffffff"
              , background: "#0077c2"
              , bold: true
          }*/
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
                , { value: dataItem.UserName }
                , { value: dataItem.From }
                , { value: dataItem.To }
                , { value: dataItem.TotalTimeCalled }
                , { value: dataItem.Total }
                , { value: dataItem.LocationNameFrom }
                , { value: dataItem.LocationNameTo }
                , { value: dataItem.TypeFixedDialName }
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
                    , { autoWidth: true }
                    , { autoWidth: true }
                    , { autoWidth: true }
                ],
                title: "Danh sách cước gọi di động",
                rows: rows
            }
        ]
    });

    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Danh sach cuoc goi di dong.xlsx" });

}