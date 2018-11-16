$(document).ready(function () {
    $("#dvExportGrid").hide();
    $("#trtext").hide();
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
            "Name": "Công ty"
        },
        {
            "ID": 2,
            "Name": "Nhân viên"
        }
    ];
    showoroff(false);
    $("#idopsearch").kendoDropDownList({
        dataTextField: "Name",
        dataValueField: "ID",
        dataSource: data,
        change: function (e) {
            if (this.value() == 1) {
                getCompany(this.value());
                showoroff(this.value());
            } else if (this.value() == 2) {
                $("#trtext").show();
                showoroff(this.value());
            }
            else {
                showoroff(this.value());
               
            }
        }
    });

   

    $("#idbtnsearch").click(function () {
        var search = $("#idopsearch").data("kendoDropDownList").dataItem().ID;
        var username = $("#idtext").val();
        var conpanyId = "";
        var branchId = "";
        var departmentId = "";
        if (search == 1) {
            conpanyId = $("#idcompany").data("kendoDropDownList").dataItem().CompanyID;
            branchId = $("#idbranch").data("kendoDropDownList").dataItem().BranchID;
            departmentId = $("#iddepartment").data("kendoDropDownList").dataItem().DepartmentID;
            if (username == "" && $("#idsearchstaff").data("kendoDropDownList").dataItem().ID == 1) {
                alert("Vui lòng nhập UserName");
                return;
            }
        } else {
            conpanyId = "";
            branchId = "";
            departmentId = "";
        }
        if ($("#idsearchstaff").data("kendoDropDownList").dataItem().ID == 0 && conpanyId != "") {
            username = "";
        }

        var data = {
            "Search": search, "UserName": username, "ConpanyID": conpanyId, "BranchID": branchId, "DepartmentID": departmentId
        };
        CallGetListStaff(data);
    });
    $(document).keypress(function (e) {
        if (e.which == 13) {
            $("#idbtnsearch").click();
        }
    });
});

function getCompany() {
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
            GetBrach($("#idcompany").data("kendoDropDownList").dataItem().CompanyID);
        },
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3 + " " + p4;
            if (xhr.responseText && xhr.responseText[0] == "{")
                err = JSON.parse(xhr.responseText).Message;
            alert().text(err);
        }
    });
}

function GetBrach(companyId) {
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
            GetDepartment($("#idbranch").data("kendoDropDownList").dataItem().BranchID);
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

function CallGetListStaff(data) {
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/CallStaff/Staff/Call_GetListStaff",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (resultData) {
            var leght = resultData.length;
            if (leght > 0) {
                $("#dvExportGrid").show();
                initLoadgird(resultData);
                $("#idinfo").html('<p style=" color: green "> Tìm thấy: ' + leght + ' </p>');
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
                    StaffName: { type: "string", editable: false, nullable: true },
                    UserName: { type: "string", editable: false, nullable: true },
                    Email: { type: "string", editable: false, nullable: true },
                    SexName: { type: "string", editable: false, nullable: true },
                    Address: { type: "string", editable: false, nullable: true },
                    Passport: { type: "string", editable: false, nullable: true },
                    RoleName: { type: "string", editable: true },
                    Birthdays: { type: "string", editable: false, nullable: true },
                    DayIn: { type: "string", editable: false, nullable: true },
                    CompanyName: { type: "string", editable: false, nullable: true },
                    BranchName: { type: "string", editable: false, nullable: true },
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
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }

            }
            ,
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
                field: "Email",
                title: "Email",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }


            },
            {
                field: "SexName",
                title: "Giới tính",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
            },
            {
                field: "Passport",
                title: "CMND",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
                //, template: "#if(Status=='Enable'){#<span style='color:green;'>Enable</span>#}else{#<span style='color:red;'>Disable</span>#}#"

            },
            {
                field: "Address",
                title: "Địa chỉ",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }
            },
            {
                field: "RoleName",
                title: "Chức vụ",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }



            },
            {
                field: "Birthdays",
                title: "Ngày sinh",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }



            },
            {
                field: "DayIn",
                title: "Ngày vào công ty",
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center"
                },
                attributes: { "class": "table-header-cell", "style": "overflow: visible; white-space: normal; text-align:center" }



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
                filterable: false,
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

//Hiện thi hoặc ẩn
function showoroff(val) {
    var txt = $("#idsearchstaff").data("kendoDropDownList").dataItem().ID;
    
    if (val == 2) {
        $("#trcompany").hide();
        $("#trbranch").hide();
        $("#trdepartment").hide();
        $("#trsearchstaff").hide();
        $("#trtext").show();
        
    } else if (val == 0) {
        $("#trtext").hide();
        $("#trcompany").hide();
        $("#trbranch").hide();
        $("#trdepartment").hide();
        $("#trsearchstaff").hide();
       
    } else if (val == 1) {
        $("#trcompany").show();
        $("#trbranch").show();
        $("#trdepartment").show();
        $("#trsearchstaff").show();
        if (txt == 0) {
        $("#trtext").hide();
    } else {
        $("#trtext").show();
    }
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
                value: "Giới tính"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "CMND"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Địa chỉ"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Chức vụ"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }
            , {
                value: "Ngày sinh"
                , color: "#ffffff"
                , background: "#0077c2"
                , bold: true
            }, {
                value: "Ngày vào công ty"
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
            }
            , {
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
                , { value: dataItem.SexName }
                , { value: dataItem.Address }
                , { value: dataItem.Passport }
                , { value: dataItem.RoleName }
                , { value: dataItem.Birthdays }
                , { value: dataItem.DayIn }
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
                title: "Danh sách nhân viên",
                rows: rows
            }
        ]
    });

    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Danh sach nhanh vien.xlsx" });

}