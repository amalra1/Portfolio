#!/bin/bash

SSH_USER="pac20"
SSH_HOST="macalan.c3sl.ufpr.br"
REMOTE_DIR="~/public_html/"
SITE_URL="https://www.inf.ufpr.br/pac20/"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting the deploy process...${NC}"

echo -e "\n${YELLOW}[1/4] Generating static files with 'npm run build'...${NC}"
npm run build

if [ $? -ne 0 ]; then
  echo "Error: Build failed. Aborting deploy."
  exit 1
fi
echo -e "${GREEN}Build completed successfully! 'out' folder generated.${NC}"

echo -e "\n${YELLOW}[2/4] Cleaning the remote directory (${REMOTE_DIR})...${NC}"
ssh ${SSH_USER}@${SSH_HOST} "rm -rf ${REMOTE_DIR}*"

echo -e "${GREEN}Remote directory cleaned.${NC}"

echo -e "\n${YELLOW}[3/4] Uploading new files from the 'out' folder to the server...${NC}"
scp -r out/* ${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}

echo -e "${GREEN}Files uploaded successfully.${NC}"

echo -e "\n${YELLOW}[4/4] Adjusting file and folder permissions on the server...${NC}"
ssh ${SSH_USER}@${SSH_HOST} "find ${REMOTE_DIR} -type d -exec chmod 755 {} \; && find ${REMOTE_DIR} -type f -exec chmod 644 {} \;"

echo -e "\n${GREEN}Permissions adjusted! Deploy completed successfully! ${NC}"
echo -e "Check your site at the link: ${GREEN}${SITE_URL}${NC}"
