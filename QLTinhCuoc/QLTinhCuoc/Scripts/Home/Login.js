$(document).ready(function () {
    SessionLogin();
    
});
$(document).keypress(function (e) {
    if (e.which == 13) {
        CallLogin();
    }
});

$("#idLogin").click(function () {

    CallLogin();

});

function CallLogin() {
    var username = $("#username").val();

    var password = $("#password").val();
    if (username == "") {
        $("#ruletext").text("Vui lòng nhập UserName");

        return;
    }
    if (password == "") {
        $("#ruletext").text("Vui lòng nhập Password");
        return;
    }
    var data = { "username": username, "password": password };
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/Login/CallLogin",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (resultData) {
            if (resultData.Code == 1) {
                location.href = location.href = location.origin + "/" + "Home";
            } else {
                $("#ruletext").text(resultData.Desc);
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

function SessionLogin() {
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
                location.href = location.href = location.origin + "/" + "Home";
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
