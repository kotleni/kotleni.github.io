
@echo off

title Input

:do

set /P i="> "
call send %1 %i%

goto do