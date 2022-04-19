
@echo off

title Output

rem Читаем ввод ника
set /P i="username: "

rem Открываем новый cmd для ввода
start cmd.exe @cmd /k "input.bat %i%"

:do

call get
cls
type "chat.txt" || cls && type "chat.txt"
timeout /t 2 /nobreak >nul

goto do