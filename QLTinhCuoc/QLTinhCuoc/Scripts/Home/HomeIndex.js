$(document).ready(function () {
    var username = $.cookie("username");
    var isLogin = $.cookie("isLogin");
    if (isLogin == "true" && username != "") {
        CallMenu(username);
    } else {
         location.href = location.href = location.origin + '/' + "Login";
        //console.log(isLogin+username);
    }
  
});

function CallMenu(username) {

    window.$.ajax({
        type: "GET",
        async: false,
        url: "/home/menuroot?Username=" + username,
        processData: false,
        cache: false,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        // data: JSON.stringify(parameters),
        success: function(resultData) {
           
            $.cookie("username", "admin");
            for (var j = 0; j < resultData.length; j++) {
            var li = "";
            var sub = resultData[j].Data;
            for (var i = 0; i < sub.length; i++) {
               // var a = location.origin + '/'
               // sub[i].URL = a+ sub[i].URL;
                li = li + "<li> <a href='" + sub[i].URL + "/'> <i class='fa fa-phone-square fa-fw'></i>" + sub[i].MenuName + "</a> </li>";
            }
            $("#menuroot #side-menu #menuroot2").after("<li> <a href='#'><i class='fa  fa-sign-out fa-fw'></i> " + resultData[j]["MenuRootName"] + "<span class='fa arrow'></span></a><ul class='nav nav-second-level'>" + li + "</ul></li>");
           // $("#menuroot #side-menu #menuroot2").append("<li>Appended item</li>");

            }
        },
        error: function(xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3 + " " + p4;
            if (xhr.responseText && xhr.responseText[0] == "{")
                err = JSON.parse(xhr.responseText).Message;
            alert(err);
        }
    });

}

$("#idlogout").click(function () {
    $.removeCookie("username");
    $.removeCookie("isLogin");
    location.href = location.href = location.origin + '/' + "Login";
});