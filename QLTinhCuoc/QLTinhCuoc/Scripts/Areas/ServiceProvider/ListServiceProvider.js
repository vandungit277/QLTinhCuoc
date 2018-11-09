$(document).ready(function () {
    CallGetInfoPhone();
});

function CallGetInfoPhone() {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/ServiceProvider/ServiceProvider/Call_GetServiceCharge",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(data),
        success: function (resultData) {

            initLoadgird(resultData);
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
                    ServiceProviderID: { type: "int", editable: false, nullable: true },
                    TypeCallID: { type: "int", editable: false, nullable: true },
                    NameServiceProvider: { type: "string", editable: false, nullable: true },
                    block1: { type: "int", editable: false, nullable: true },
                    price1: { type: "float", editable: true },
                    block2: { type: "int", editable: false, nullable: true },
                    price2: { type: "float", editable: false, nullable: true },
                    NameTypeCall: { type: "string", editable: false, nullable: true }

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
                field: "ServiceProviderID",
                title: "ServiceProviderID",
                hidden: true,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }

            }
            ,
            {
                field: "TypeCallID",
                title: "TypeCallID",
                hidden: true,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
            },
            {
                field: "NameServiceProvider",
                title: "Nhà cung cấp",
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
                field: "NameTypeCall",
                title: "Loại dịch vụ",
                filterable: {
                    multi: true
                },
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
                //, template: "#= setTempaltePaidtype(" + "PaidType" + ") #"


            }
            ,
            {
                field: "block1",
                title: "block1(s)",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
            },
            {
                field: "price1",
                title: "Giá cước block1(đ)",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }



            },
            {
                field: "block2",
                title: "block2(s)",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }



            },
            {
                field: "price2",
                title: "Giá cước block2(đ)",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }



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