#!/bin/bash

### install common utils
echo "install common utls (git, curl...)"
sudo apt-get install git
sudo apt-get install curl

### install mongodb
echo "-- [Install mongodb]--"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org

echo "start mongodb"
sudo service mongod start


### install nginx 

### install node js
echo "-- [ Install nodeJS ] --"
curl -sL https://deb.nodesource.com/setup_7.x | sudo bash -
sudo apt-get update && sudo apt-get install nodejs -y
sudo mv /usr/bin/node /usr/bin/nodeBACKUP
sudo ln -s /usr/bin/nodejs /usr/bin/node

### export node production version
echo "set node to production version"
export NODE_ENV=production

### Increase swap file, needed for node_modules
echo "-- [Increase swap file] --"
sudo fallocate -l 1G /swapfile
echo "created 1GB swapfile"
sudo chmod 600 /swapfile
sudo mkswap /swapfile
echo "enable swap space"
sudo swapon /swapfile
echo "swap file increased!"


### sudo ln -nsf ../server server