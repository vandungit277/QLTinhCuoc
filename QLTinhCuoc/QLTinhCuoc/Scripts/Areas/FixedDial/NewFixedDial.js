$(document).ready(function () {
    $("#idsave").click(function () {
        CallNewFixedDial();
    });
    GetLocation();
    GetTypeFixedDialName();
    
});

// create DropDownList from input HTML element


function GetTypeFixedDialName() {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/CallDropDown/DropDown/Call_GetTypeFixedDialName",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
       // data: JSON.stringify(data),
        success: function (resultData) {

            $("#typefixeddial").kendoDropDownList({
                dataTextField: "TypeFixedDialName",
                dataValueField: "TypeFixedDialID",
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

function GetLocation() {
    window.$.ajax({
        type: "GET",
        async: false,
        url: "/CallDropDown/DropDown/Call_GetLocation",
        processData: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(data),
        success: function (resultData) {

            $("#idlocation").kendoDropDownList({
                dataTextField: "LocationName",
                dataValueField: "LocationID",
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

function CallNewFixedDial() {

    var locationId = $("#idlocation").data("kendoDropDownList").dataItem().LocationID;
    var postalCode = $("#idpostalcode").val();
    var description = $("#iddesc").val();
    var typeFixedDialId = $("#typefixeddial").data("kendoDropDownList").dataItem().TypeFixedDialID;
    var status = $("#idstatus").val();
    if (postalCode == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập đầu số</p>');
        return;
    }
    if (description == "") {
        $("#idinfo").html('<p style=" color: red ">Vui lòng nhập mô tả</p>');
        return;
    }

    var data = { "LocationID": locationId, "PostalCode": postalCode, "Description": description, "TypeFixedDialID": typeFixedDialId, "Status": status };
    window.$.ajax({
        type: "POST",
        async: false,
        url: "/CallFixedDial/FixedDial/Call_NewFixedDial",
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
