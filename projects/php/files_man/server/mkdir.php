<?php
$username = @$_GET['username'];
$dirname = @$_GET['dir'];

if($username == '' and $filename == '') exit('Invalid request');

if (!is_dir('./files/' . $username)) {
    mkdir('./files/' . $username, 0777);
}

$dir = "./files/" . $username . '/' . $dirname;

if (!is_dir($dir)) {
    mkdir($dir, 0777);
    echo 'OK';
} else exit("Dir exists");