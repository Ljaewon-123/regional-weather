#!/bin/bash

# 초기 실행 시 redis와 server_green만 실행
echo "Starting only redis and server_green..."
docker-compose up -d redis server_green

# Nginx 컨테이너 시작
echo "Starting Nginx..."
docker-compose up -d nginx

echo "Initialization completed. Active server: server_green"
