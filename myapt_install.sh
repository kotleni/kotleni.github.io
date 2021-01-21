#!/bin/sh

# update all
sudo apt update
sudo apt upgrade

# install other
sudo apt install mc default-jre python3 python3-pip hexcurse snapd openssh-server unzip unrar neofetch 
sudo apt install wine-stable mono-runtime git wget curl

# install MonoDevelop
sudo apt install apt-transport-https dirmngr
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
echo "deb https://download.mono-project.com/repo/ubuntu vs-bionic main" | sudo tee /etc/apt/sources.list.d/mono-official-vs.list
sudo apt update

# links
echo https://desktop.telegram.org/
echo https://atom.io/
