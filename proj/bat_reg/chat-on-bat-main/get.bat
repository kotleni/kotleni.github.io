
@echo off

set PATH=%PATH%;%CD%/lib/

http https://example.com/chat.txt -method GET -saveTo chat.txt
