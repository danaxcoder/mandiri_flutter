<?php

// MY:
// 76saROzBHh1JQ/fxfXBtE2Wstmk1XPecVJ7dnAU47Jff/cN+m81Fcd5W3k2XtWtD
// 4QWqxeT2qSadeMvpz/6lBA==
// PESTAPOIN:
// wC5IvfGhhYbG+7dH/Z/iYRG1JHovxsOlvXPz7ccAkOpI2lMv+dix0CqCVdHq7ALr
// JNf56O28Uy2Y2lv+zbHoJQ==

header("Access-Control-Allow-Origin: *");

$totalSentString = file_get_contents("total_sent.txt");
if ($totalSentString==NULL || trim($totalSentString)=="") {
    $totalSentString = "0";
}
$totalSent = intval($totalSentString);
if ($totalSent > 20) {
    //return;
}
$totalSent++;
file_get_contents("total_sent.txt", "".$totalSent);

$message = urldecode(base64_decode($_GET['message']));
$token = decrypt('76saROzBHh1JQ/fxfXBtE2Wstmk1XPecVJ7dnAU47Jff/cN+m81Fcd5W3k2XtWtD');
$chatID = decrypt('4QWqxeT2qSadeMvpz/6lBA==');

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,"https://api.telegram.org/bot".$token."/sendMessage?parse_mode=html");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, '{"chat_id":"'.$chatID.'","text":"'.$message.'"}');
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$server_output = curl_exec($ch);
curl_close($ch);

function decrypt($value) {
    $key = 'Qu0qMbE4EtduQF8';
    $decrypted = openssl_decrypt($value, "aes-256-cbc", $key);
    return $decrypted;
}