#!/bin/sh

if [ $(id -u) -ne 0 ]; then
    echo 'run as root'
    exit
fi

curl -L https://github.com/xavier-arthur/minifier-watchdog/releases/download/v0.1.1-pre-release/watchdog.js > /usr/bin/watchdog.js
chmod 744 /usr/bin/watchdog.js
echo "#!/usr/bin/env node\nrequire('./watchdog.js');" > /usr/bin/watchdog
chmod 755 /usr/bin/watchdog