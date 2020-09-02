<?php

    $query_string = isset($_SERVER["QUERY_STRING"])?$_SERVER["QUERY_STRING"]:"";

    $curl = curl_init();
    $url="localhost:8010/api/v1/poi_query";
    $url = sprintf("%s?%s", $url, $query_string);


    // Optional Authentication:
//    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
//    curl_setopt($curl, CURLOPT_USERPWD, "username:password");
        curl_setopt($curl, CURLOPT_HTTPGET, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Accept: application/json'
        ));

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);

        echo json_encode(["status_code"=>$httpcode,"data"=>json_decode($result,true)]);

