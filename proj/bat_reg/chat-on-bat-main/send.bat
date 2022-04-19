
@echo off

set usr=%1
set msg=%2

http "http://devunicon.000webhostapp.com/chat/send.php?username=%usr%&message=%msg%" -method GET
