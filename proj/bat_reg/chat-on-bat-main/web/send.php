<?php

$username = $_GET['username'];  //rem Читаем ввод ника
                                //set /P i="username: "

$message = $_GET['message'];    //set usr=%1
                                //set msg=%2
                                //http "http://example.com" -method GET                              
$fp = fopen('chat.txt', 'a'); 
fwrite($fp, $username . ' : ' . $message . PHP_EOL);  
fclose($fp);

//Вот этот файл вы должны кинуть на ваш сервер.
//Еще надо создать файл: chat.txt. (оно зависит от названия переменнов в батнике)
// example.com это пример если что
