$(document).ready(function () {
    $("#dvExportGrid").hide();
    CallGetPhoneCompany();
});

function CallGetPhoneCompany() {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/PhoneInside/PhoneInside/Call_GetIPPhoneCompany",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(data),
        success: function (resultData) {

            if (resultData.length > 0) {
                $("#dvExportGrid").show();
                initLoadgird(resultData);
            } else {
                $("#dvExportGrid").hide();
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
                    StaffName: { type: "string", editable: false, nullable: true },
                    UserName: { type: "string", editable: false, nullable: true },
                    Email: { type: "string", editable: false, nullable: true },
                    CompanyName: { type: "string", editable: false, nullable: true },
                    BranchName: { type: "string", editable: true },
                    DepartmentName: { type: "string", editable: false, nullable: true },
                    IPPhone: { type: "string", editable: false, nullable: true },
                    NameServiceProvider: { type: "string", editable: false, nullable: true }

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
                field: "StaffName",
                title: "Nhân viên",
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }

            }
            ,
            {
                field: "UserName",
                title: "Tài khoản",
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
            },
            {
                field: "Email",
                title: "Email",
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
                , filterable: {
                    multi: true
                }
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
            },
            {
                field: "BranchName",
                title: "Chi nhánh",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }



            },
            {
                field: "DepartmentName",
                title: "Phòng ban",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }



            },
            {
                field: "IPPhone",
                title: "IPPhone",
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }



            },
            {
                field: "NameServiceProvider",
                title: "Nhà cung cấp",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
                //, template: "#= setTempaltePaidtype(" + "PaidType" + ") #"


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
                value: "Nhân viên"
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
                value: "Email"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Công ty"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Chi nhánh"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Phòng ban"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "IPPHONE"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }, {
                value: "Nhà cung cấp"
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
                , { value: dataItem.StaffName }
                , { value: dataItem.UserName }
                , { value: dataItem.Email }
                , { value: dataItem.CompanyName }
                , { value: dataItem.BranchName }
                , { value: dataItem.DepartmentName }
                , { value: dataItem.IPPhone }
                , { value: dataItem.NameServiceProvider }

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
                title: "Danh sách số nội bộ chi nhánh",
                rows: rows
            }
        ]
    });

    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Danh sach so noi bo theo chi nhanh.xlsx" });

}