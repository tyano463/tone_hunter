#!/bin/bash

set -x
set -e

brew install nvm
brew install nvm
export NVM_DIR="$HOME/.nvm"
source $(brew --prefix nvm)/nvm.sh
nvm install 24.2
nvm use 24.2

echo "node version: $(node -v)"

brew install rbenv ruby-build
export RBENV_ROOT="$HOME/.rbenv"
eval "$(rbenv init -)"

rbenv install -s 3.3.3
rbenv global 3.3.3

echo "Ruby version: $(ruby -v)"

CUR=`pwd`
echo "current directory is ${CUR}"
cd /Volumes/workspace/repository && npm install
echo "npm installed"

cd /Volumes/workspace/repository && bundle install
echo "bundle installed"
cd /Volumes/workspace/repository/ios && bundle exec pod install
echo "pod installed"

cd ${CUR}
