<?php

include 'web.php';
$web = new Web("kotleni");

while(true) {
    $i = explode(' ', readline("> "));

    switch ($i[0]) {
        case 'list':
            echo $web->listFiles($i[1]) . PHP_EOL;
            break;
        case 'new':
            echo $web->newFile($i[1]) . PHP_EOL;
            break;
        case 'read':
            echo $web->downloadFile($i[1]) . PHP_EOL;
            break;
        case 'write':
            echo $web->editFile($i[1], $i[2]) . PHP_EOL;
            break;

        default:
            echo "Unknown command";
            break;
    }
}
