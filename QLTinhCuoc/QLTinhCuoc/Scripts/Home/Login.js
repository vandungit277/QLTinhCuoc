$(document).ready(function () {
    var username = $.cookie("username");
    var isLogin = $.cookie("isLogin");
   
    if (isLogin == "true" && username !="") {
        location.href = location.origin + '/'+"Home";
    }

});

$("#idLogin").click(function () {
    var username = $("#username").val();

    var password = $("#password").val();
    var data = { "username": username, "password": password };
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/Login/CallLogin",
        processData: false,
        cache: false,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
        success: function (resultData) {
            if (resultData.Code == 1) {
                $.cookie("username", username);
                $.cookie("isLogin","true");
                location.href = location.href = location.origin + '/' + "Home";
            } else {
                alert(resultData.Desc);
            }

           


        },
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3 + " " + p4;
            if (xhr.responseText && xhr.responseText[0] == "{")
                err = JSON.parse(xhr.responseText).Message;
            alert(err);
        }
    });
});

