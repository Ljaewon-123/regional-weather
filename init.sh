#!/bin/bash

# 초기 실행 시 server_green만 실행
echo "Starting only server_green..."
docker-compose up -d redis server_green nginx

echo "Initialization completed. Active server: server_green"
