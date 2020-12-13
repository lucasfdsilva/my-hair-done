#!/bin/bash
echo "Installing NPM Dependencies"
sudo npm install --prefix /home/ec2-user/my-hair-done/backend/
sudo npm install --prefix /home/ec2-user/my-hair-done/web/
sudo npm run build --prefix /home/ec2-user/my-hair-done/web/