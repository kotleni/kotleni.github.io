#!/bin/sh

cd /tmp/
git clone git@github.com:kotleni/kotleni.git
cd kotleni/
echo $(openssl rand -base64 8) > index
git add *
git commit -m "Index $(openssl rand -base64 8)"
git push
