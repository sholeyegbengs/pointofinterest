<?php

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("location: index.php");
}


    $curl = curl_init();
    $url="localhost:8010/api/v1/review/create";
    $url = sprintf("%s", $url);

    $payload = json_encode($_POST);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Accept: application/json'
    ));

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);
        $data = json_decode($result,true);


        echo json_encode(["status_code"=>$httpcode,"data"=>$data]);

