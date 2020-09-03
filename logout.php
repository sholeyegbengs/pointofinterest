<?php

if($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header("location: user_dashboard.php");
}

ob_start();
session_start();

if(!isset($_SESSION['username']))
{
    header("location: index.php");
}

    unset($_SESSION["username"]);
    unset($_SESSION["token"]);
header("location: index.php");

