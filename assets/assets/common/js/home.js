var titles = [
    "Selamat datang di aplikasi Livin' by Mandiri terbaru",
    "Cek e-Wallet tanpa ribet",
    "Tetap tenang tanpa kartu",
    "Semua bisa jadi nyata"
];
var descriptions = [
    "Satu aplikasi perbankan untuk gaya hidup dan segala kebutuhan Anda sehari-hari.",
    "Lebih dari sekedar top-up. Pantau semua saldo e-Wallet kamu dalam satu aplikasi.",
    "Lupa bawa kartu, tapi butuh cash? Bisa! Bagi-bagi cash tanpa ketemu? Bisa!",
    "Wujudkan impian sekarang juga dengan pinjaman yang dibuat khusus untuk Anda."
];
var currentPage = 0;

$(document).ready(function() {
    $("#intro-title").html(titles[0]);
    $("#intro-description").html(descriptions[0]);
    $("#loader1").css("width", "100%");
    $("#intro1").on('transitionend webkitTransitionEnd oTransitionEnd', function() {
        $("#intro-title").html(titles[currentPage]);
        $("#intro-description").html(descriptions[currentPage]);
    });
    $('#loader1').one('transitionend webkitTransitionEnd oTransitionEnd', function () {
        currentPage = 1;
        $("#intro1").css("transform", "translateX(-100%)");
        $("#intro2").css("transform", "translateX(-100%)");
        $("#intro3").css("transform", "translateX(-100%)");
        $("#intro4").css("transform", "translateX(-100%)");
        $("#loader2").css("width", "100%");
    });
    $('#loader2').one('transitionend webkitTransitionEnd oTransitionEnd', function () {
        currentPage = 2;
        $("#intro1").css("transform", "translateX(-200%)");
        $("#intro2").css("transform", "translateX(-200%)");
        $("#intro3").css("transform", "translateX(-200%)");
        $("#intro4").css("transform", "translateX(-200%)");
        $("#loader3").css("width", "100%");
    });
    $('#loader3').one('transitionend webkitTransitionEnd oTransitionEnd', function () {
        currentPage = 3;
        $("#intro1").css("transform", "translateX(-300%)");
        $("#intro2").css("transform", "translateX(-300%)");
        $("#intro3").css("transform", "translateX(-300%)");
        $("#intro4").css("transform", "translateX(-300%)");
        $("#loader4").css("width", "100%");
    });
    $('#loader4').one('transitionend webkitTransitionEnd oTransitionEnd', function () {
        currentPage = 0;
        $("#intro-title").html(titles[0]);
        $("#intro-description").html(descriptions[0]);
        $("#intro1").css("transform", "translateX(0%)");
        $("#intro2").css("transform", "translateX(0%)");
        $("#intro3").css("transform", "translateX(0%)");
        $("#intro4").css("transform", "translateX(0%)");
        $("#loader1").css("transition", "none");
        $("#loader2").css("transition", "none");
        $("#loader3").css("transition", "none");
        $("#loader4").css("transition", "none");
        $("#loader1").css("width", "0");
        $("#loader2").css("width", "0");
        $("#loader3").css("width", "0");
        $("#loader4").css("width", "0");
        setTimeout(() => {
            $("#loader1").css("transition", "width 10s");
            $("#loader2").css("transition", "width 10s");
            $("#loader3").css("transition", "width 10s");
            $("#loader4").css("transition", "width 10s");
            $("#loader1").css("width", "100%");
        }, 500);
    });
});

function haveCard() {
    setTimeout(() => {
        window.location.href = "card.html";
    }, 500);
}

function regNewCard() {
    setTimeout(() => {
        window.location.href = "card.html";
    }, 500);
}

module.haveCard = haveCard;
module.regNewCard = regNewCard;