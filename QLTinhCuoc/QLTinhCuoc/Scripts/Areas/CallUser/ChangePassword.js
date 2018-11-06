$("#idchange").click(function () {
    SessionLoginchangepass();
});
$(document).keypress(function (e) {
    if (e.which == 13) {
        SessionLoginchangepass();
    }
});


function SessionLoginchangepass() {
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
                var oldpassword = $("#idOldPassword").val();
                var newpassword = $("#idNewPassword").val();
                CallChangePassword(resultData.UserName, oldpassword, newpassword);
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


function CallChangePassword(username, oldpassword, newpassword) {

    if (newpassword.length < 6) {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập mật khẩu mới > 6 ký tự</p>');
        return;
    }

    if (oldpassword == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập mật khẩu cũ</p>');
        return;
    }
    if (newpassword == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập mật khẩu mới</p>');
        return;
    }
    var data = { "username": username, "OldPassword": oldpassword, "NewPassWord": newpassword };
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/CallUser/User/Call_ChangePassword",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (resultData) {
            if (resultData.Code == 1) {
                $("#idinfo").html('<p style=" color: green ">' + resultData.Desc + "</p>");
                $("#idOldPassword").val("");
                $("#idNewPassword").val("");


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
