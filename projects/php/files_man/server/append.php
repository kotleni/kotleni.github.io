<?php
$username = @$_GET['username'];
$filename = @$_GET['file'];
$data = @$_GET['data'];

if($username == '' and $filename == '') exit('Invalid request');

if (!is_dir('./files/' . $username)) {
    mkdir('./files/' . $username, 0777);
}

$file = "./files/" . $username . '/' . $filename;
$base = base64_decode($data);

if(file_exists($file)) {
    $f = fopen($file, 'a');
    fwrite($f, $base);
    fclose($f);
    
    echo 'OK';
} else exit('File not found');
