<?php
$username = @$_GET['username'];
$filename = @$_GET['file'];

if($username == '' and $filename == '') exit('Invalid request');

if (!is_dir('./files/' . $username)) {
    mkdir('./files/' . $username, 0777);
}

$file = "./files/" . $username . '/' . $filename;

if(file_exists($file)) {
    $base = base64_encode(file_get_contents($file));
    
    echo $base;
} else exit('File not found');