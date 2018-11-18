$(document).ready(function () {
   
    $("#idsave").click(function () {
        CallNewGroup();
    });
});

function CallNewGroup() {
    var groupname = $("#idgroupname").val();
    var desc = $("#iddesc").val();
    var status = $("#idstatus").val();
    if (groupname == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập tên group</p>');
        return;
    }
    if (desc == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập mô tả cho group</p>');
        return;
    }

    var data = {
        "GroupsName": groupname, "Description": desc, "Status": status,"CreateBy":"System"
    };
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/CallGroup/Group/Call_NewGroup",
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


