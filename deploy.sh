#!/bin/bash

# 현재 활성 서버 확인
CURRENT_SERVER=$(docker-compose -f docker-compose.green.yml exec nginx bash -c 'echo $ACTIVE_SERVER' 2>/dev/null || echo "server_blue:3002")

# 활성 서버가 설정되지 않은 경우 기본값으로 시작
if [[ -z "$CURRENT_SERVER" ]]; then
  echo "No active server found. Defaulting to server_green as active."
  CURRENT_SERVER="server_green:3001"
fi

# 활성 서버에 따라 비활성 서버 및 서비스 결정
if [[ "$CURRENT_SERVER" == "server_green:3001" ]]; then
  INACTIVE_SERVICE="server_blue"
  INACTIVE_SERVER="server_blue:3002"
  ACTIVE_SERVICE="server_green"
  COMPOSE_FILE="docker-compose.blue.yml"
else
  INACTIVE_SERVICE="server_green"
  INACTIVE_SERVER="server_green:3001"
  ACTIVE_SERVICE="server_blue"
  COMPOSE_FILE="docker-compose.green.yml"
fi

echo "Current active server: $CURRENT_SERVER"
echo "Inactive server: $INACTIVE_SERVER"

# 1. 비활성 서버에 새 버전 배포
echo "Building and deploying new version to $INACTIVE_SERVICE..."
docker-compose -f $COMPOSE_FILE up -d --build $INACTIVE_SERVICE

# 2. 비활성 서버 상태 확인
echo "Testing $INACTIVE_SERVER..."
HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${INACTIVE_SERVER##*:}/health)

if [[ "$HEALTH_CHECK" != "200" ]]; then
  echo "Health check failed for $INACTIVE_SERVER. Aborting deployment."
  exit 1
fi

echo "$INACTIVE_SERVER passed health check."

# 3. Nginx에서 서버 전환
echo "Switching Nginx active server to $INACTIVE_SERVER..."
docker-compose -f $COMPOSE_FILE exec nginx nginx -s reload

# 4. 이전 서버 클린업
echo "Stopping and cleaning up $ACTIVE_SERVICE..."
docker-compose -f $COMPOSE_FILE stop $ACTIVE_SERVICE
docker-compose -f $COMPOSE_FILE up -d --build $ACTIVE_SERVICE

echo "Deployment completed successfully!"
