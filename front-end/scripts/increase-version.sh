#write merge master into prod script
#!/bin/sh

CONTAINER='gdtx_fe'

GREEN='\033[0;32m'
NC='\033[0m'
EXPOSE_PORT='3000'
MAP_PORT='3000'

set -x

echo ${GREEN} Increasing version ...${NC}
node scripts/Increase-version.js
git add .
git commit -m 'Increase version'
git push
value=$(<public/version.json)
echo ${GREEN} New version: $value ${NC}
