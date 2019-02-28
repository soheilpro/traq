#!/usr/bin/env sh

node ./src/server.js | tee -a $1
