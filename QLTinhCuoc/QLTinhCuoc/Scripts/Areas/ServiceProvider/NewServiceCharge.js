$(document).ready(function () {
    $("#idsave").click(function () {
        CallSaveNewIPPhone();
    });
    GetServiceProvider();
    GetTypeCall();
});

// create DropDownList from input HTML element


function GetServiceProvider() {
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

function GetTypeCall() {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/ServiceProvider/ServiceProvider/Call_GetTypeCall",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(data),
        success: function (resultData) {

            $("#idtype").kendoDropDownList({
                dataTextField: "NameTypeCall",
                dataValueField: "TypeCallID",
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

    var typeCallId = $("#idtype").val();
    var serviceProviderId = $("#idncc").val();
    var status = $("#idstatus").val();
    var block1 = $("#idblock1").val();
    var price1 = $("#idpriceblock1").val();
    var block2 = $("#idblock2").val();
    var price2 = $("#idpriceblock2").val();
    if (block1 == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập Block 1</p>');
        return;
    }
    if (price1 == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập giá tiền Block 1</p>');
        return;
    }
    if (block2 == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập Block 2</p>');
        return;
    }
    if (price2 == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập giá tiền Block 2</p>');
        return;
    }

    var data = { "ServiceProviderID": serviceProviderId, "TypeCallID": typeCallId, "Status": status, "block1": block1, "price1": price1, "block2": block2, "price2": price2 };
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/ServiceProvider/ServiceProvider/Call_NewServiceCharge",
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
