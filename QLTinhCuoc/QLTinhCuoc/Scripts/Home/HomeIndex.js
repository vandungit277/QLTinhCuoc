$(document).ready(function () {
     SessionLogin();
   });

function CallMenu(username) {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/home/menuroot?Username=" + username,
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(parameters),
        success: function(resultData) {
            for (var j = 0; j < resultData.length; j++) {
            var li = "";
            var sub = resultData[j].Data;
            for (var i = 0; i < sub.length; i++) {
              li = li + "<li> <a href='" + sub[i].URL + "/'> <i class='fa fa-phone-square fa-fw'></i>" + sub[i].MenuName + "</a> </li>";
            }
            $("#menuroot #side-menu #menuroot2").after("<li> <a href='#'><i class='fa  fa-sign-out fa-fw'></i> " + resultData[j]["MenuRootName"] + "<span class='fa arrow'></span></a><ul class='nav nav-second-level'>" + li + "</ul></li>");
          

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
                CallMenu(resultData.UserName);
                $("#usernameText").text(resultData.UserName);
            } else {
                location.href = location.href = location.origin + "/" + "Login";
            }
        },
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3 + " " + p4;
            if (xhr.responseText && xhr.responseText[0] == "{")
                err = JSON.parse(xhr.responseText).Message;
            alert(err);
        }
    });
}



$("#idlogout").click(function () {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/Login/KillSessionLogin",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultData) {
            if ( resultData.Code == 0) {
                location.href = location.href = location.origin + "/" + "Login";
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