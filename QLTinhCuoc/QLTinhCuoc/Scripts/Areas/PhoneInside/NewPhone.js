$(document).ready(function () {
    $("#idsave").click(function () {
        CallSaveNewIPPhone();
    });
    CallGetInfo();
});

// create DropDownList from input HTML element


function CallGetInfo() {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/PhoneInside/PhoneInside/Call_GetServiceProvider",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
       // data: JSON.stringify(data),
        success: function (resultData) {

            $("#idncc").kendoDropDownList({
                dataTextField: "NameServiceProvider",
                dataValueField: "ServiceProviderID",
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

function CallSaveNewIPPhone() {

    var username = $("#idusername").val();
    var serviceProviderId = $("#idncc").val();
    var ipPhone = $("#idipphone").val();
    var status = $("#idstatus").val();
    var description = $("#iddesc").val();

    if (username == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập tài khoản nhận IPPhone </p>');
        return;
    }

    if (ipPhone == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập IPPhone</p>');
        return;
    }
    if (description == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập mô tả</p>');
        return;
    }
    var data = { "UserName": username, "ServiceProviderID": serviceProviderId, "IPPhone": ipPhone, "Status": status, "Description": description };
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/PhoneInside/PhoneInside/Call_NewIpPhoneInside",
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
