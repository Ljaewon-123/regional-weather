#!/bin/bash

cp weather-server/nginx/nginx_green.conf weather-server/nginx/nginx.conf

# Green 버전 서버 빌드 및 실행
docker-compose -f docker-compose.green.yaml build

# 공통 컴포즈 파일 빌드 및 실행 (Green 서버가 기동된 후)
docker-compose -f docker-compose.common.yaml build

docker-compose -f docker-compose.green.yaml up -d
docker-compose -f docker-compose.common.yaml up -d

echo "Initialization completed. Active server: server_green"
