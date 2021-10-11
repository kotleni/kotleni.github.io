<?php
$username = @$_GET['username'];
$dirname = @$_GET['dir'];

if($username == '' and $filename == '') exit('Invalid request');

if (!is_dir('./files/' . $username)) {
    mkdir('./files/' . $username, 0777);
}

$dir = "./files/" . $username . '/' . $dirname;

if(file_exists($dir)) {
    $files = array_diff(scandir($dir), array('.', '..'));
    
    foreach($files as $file) {
        echo $file . PHP_EOL;
    }
} else exit('Dir not found');