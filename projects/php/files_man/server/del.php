<?php
$username = @$_GET['username'];
$filename = @$_GET['file'];

if($username == '' and $filename == '') exit('Invalid request');

if (!is_dir('./files/' . $username)) {
    mkdir('./files/' . $username, 0777);
}

$file = "./files/" . $username . '/' . $filename;

if(file_exists($file)) {
    unlink($file);
    echo 'OK';
} else exit('File not found');