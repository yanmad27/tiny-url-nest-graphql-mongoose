#write merge master into prod script
#!/bin/sh

CONTAINER='rsrm.dev-shorten'

GREEN='\033[0;32m'
NC='\033[0m'
EXPOSE_PORT='3000'
MAP_PORT='7001'

set -x

{
    echo ${GREEN} Build $CONTAINER starting ...${NC} &&
    git stash  &&
    git pull &&
    git config core.pager cat && 
    echo Last commit message: $(git log -1 --pretty=%B) &&
    docker build -t $CONTAINER . &&
    docker stop $CONTAINER 
    docker rm $CONTAINER 
    docker run -d \
        --restart always \
        --name $CONTAINER \
        -p $MAP_PORT:$EXPOSE_PORT \
        $CONTAINER &&
    echo ${GREEN} Build $CONTAINER DONE${NC}
}

if [ $? == 0 ] ; then
    SUCCESS_MASSAGE="✅ SUCCESS: build $CONTAINER successfully"
    sh scripts/notify.sh "${SUCCESS_MASSAGE}"
else
    ERROR_MESSAGE="❌ FAILED: Build $CONTAINER failed" 
    sh scripts/notify.sh "${ERROR_MESSAGE}"
fi
