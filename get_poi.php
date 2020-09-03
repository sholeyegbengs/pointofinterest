<?php

if($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header("location: index.php");
}
ob_start();
session_start();

$curl = curl_init();
$url="localhost:8010/api/v1/poi";
$url = sprintf("%s", $url);

$access_token = $_SESSION["token"];
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Accept: application/json',
    "Authorization: Bearer {$access_token}"
));

curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($curl);
$httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

curl_close($curl);
$data = json_decode($result,true);

if($httpcode==401)
{

    unset($_SESSION["username"]);
    unset($_SESSION["token"]);
}

echo json_encode(["status_code"=>$httpcode,"data"=>$data]);
