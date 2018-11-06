GetSessionLogin();
function GetSessionLogin() {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/Login/SessionLogin",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultData) {
            if (resultData.Code == 1) {
                CallGetInfo(resultData.UserName);
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
function CallGetInfo(username) {
    var data = { "UserName": username };
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/CallUser/User/Call_InfoAccount",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (resultData) {
            if (resultData.UserName != "") {
                $("#idUserName").text(resultData.UserName);
                $("#idStaffName").text(resultData.StaffName);
                $("#idEmail").text(resultData.Email);
                $("#idRoleName").text(resultData.RoleName);
                $("#idIPPhone").text(resultData.IPPhone);
                $("#idCompanyName").text(resultData.CompanyName);
                $("#idBranchName").text(resultData.BranchName);
                $("#idDepartmentName").text(resultData.DepartmentName);
                $("#idDayIn").text(resultData.DayIn);
                $("#idPhoneNumber").val(resultData.PhoneNumber);
                $("#idgioitinh").val(resultData.SexID).change();
            } else {
                $("#idUserName").text("");
                $("#idStaffName").text("");
                $("#idEmail").text("");
                $("#idRoleName").text("");
                $("#idIPPhone").text("");
                $("#idCompanyName").text("");
                $("#idBranchName").text("");
                $("#idDepartmentName").text("");
                $("#idDayIn").text("");
                $("#idPhoneNumber").val("");
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

