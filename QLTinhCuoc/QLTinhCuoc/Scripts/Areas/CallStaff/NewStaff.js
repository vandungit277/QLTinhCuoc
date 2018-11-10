$(document).ready(function () {
    getCompany();
    getRole();
    $("#idbirtday").kendoDatePicker({
        value: "01/01/1990",
        format: "dd/MM/yyyy"
    });
    $("#iddayin").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy"
    });


    $("#idsave").click(function () {
        CallNewStaff();
    });
});

// create DropDownList from input HTML element


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
        success: function(resultData) {

            $("#idcompany").kendoDropDownList({
                dataTextField: "CompanyName",
                dataValueField: "CompanyID",
                dataSource: resultData,
                change: function(e) {
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

function getRole() {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/CallDropDown/DropDown/Call_GetRole",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(data),
        success: function (resultData) {

            $("#idrole").kendoDropDownList({
                dataTextField: "RoleName",
                dataValueField: "RoleID",
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

function CallNewStaff() {

    var staffname = $("#idstaffname").val();
    var address = $("#idaddress").val();
    var passport = $("#idpassport").val();
    var email = $("#idemail").val();
    var phone = $("#idphone").val();
    var username = $("#idusername").val();
    var password = $("#idpassword").val();
    var rppassword = $("#idrppassword").val();
    var departmentId = $("#iddepartment").data("kendoDropDownList").dataItem().DepartmentID;
    var roleId = $("#idrole").data("kendoDropDownList").dataItem().RoleID;
    var sexid = $("#idsex").val();
    var status = $("#idstatus").val();
    var birtday = $("#idbirtday").val();
    var dayin = $("#iddayin").val();
    if (staffname == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập họ và tên nhân viên</p>');
        return;
    }
    if (address == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập địa chỉ</p>');
        return;
    }
    if (passport == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập CMND</p>');
        return;
    }
    if (email == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập email</p>');
        return;
    }
    if (phone == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập số điện thoại</p>');
        return;
    }
    if (username == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập UserName</p>');
        return;
    }
    if (password == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập Password</p>');
        return;
    }
    if (password != rppassword) {
        $("#idinfo").html('<p style=" color: red ">Mật khẩu không khớp</p>');
        return;
    }

    var data = {
        "DepartmentID": departmentId, "SexID": sexid, "RoleID": roleId, "StaffName": staffname, "Birthdays": birtday, "Address": address, "Status": status,
        "DayIn": dayin, "Passport": passport, "UserName": username, "Password": password, "Email": email, "PhoneNumber": phone
    };
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/CallStaff/Staff/Call_NewStaff",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (resultData) {
            if (resultData.Code == 1) {
                $("#idinfo").html('<p style=" color: green ">' + resultData.Desc + "</p>");
               
            } else {
                $("#idinfo").html('<p style=" color: red ">' + resultData.Desc + "</p>");

            }
        },
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3 + " " + p4;
            if (xhr.responseText && xhr.responseText[0] == "{")
                err = JSON.parse(xhr.responseText).Message;
            $("#ruletext").text(err);
        }
    });
}

function CheckDate(date, id) {
    $("#idsave").prop("disabled", true);
    if (date.length == 10) {
        var strDate = date.split("/");
        if (strDate[0].length == 2 && strDate[1].length == 2 && strDate[2].length == 4) {
            if (strDate[0] > 31) {
                $("#idinfo").html('<p style=" color: red ">Định dạng ngày sai (<=31). Vui lòng nhập lại!</p>');
                $("#" + id + "").focus();
                return;
            }else
            if (strDate[1] > 12) {
                $("#idinfo").html('<p style=" color: red ">Định dạng tháng sai (<=12). Vui lòng nhập lại!</p>');
                $("#" + id + "").focus();
                return;
            }else
            if (strDate[1] == 2 && strDate[0] > 29) {
                $("#idinfo").html('<p style=" color: red ">Định dạng ngày tháng sai (Tháng " + strDate[1] + "ngày" + strDate[0] + "). Vui lòng nhập lại!</p>');
                $("#" + id + "").focus();
                return;
            }
            else {
                $("#idinfo").html('<p style=" color: red "></p>');
                $("#idsave").prop("disabled", false);
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

