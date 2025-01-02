#!/bin/bash

# 현재 활성 서버를 확인합니다.
if [ -f active_server.txt ]; then
  ACTIVE_SERVER=$(cat active_server.txt)
else
  echo "Error: active_server.txt 파일을 찾을 수 없습니다."
  exit 1
fi

if [ "$ACTIVE_SERVER" == "server_green:3001" ]; then
  NEW_ACTIVE_SERVER="server_blue:3002"
  NEW_CONFIG_FILE="./weather-server/nginx/nginx_blue.conf"
  SERVER_TO_START="server_blue"
  START_NAME="blue"
  STOP_NAME="green"
  SERVER_TO_STOP="server_green"
  HEALTH_CHECK_URL="http://localhost:3002/health"
else
  NEW_ACTIVE_SERVER="server_green:3001"
  NEW_CONFIG_FILE="./weather-server/nginx/nginx_green.conf"
  SERVER_TO_START="server_green"
  START_NAME="green"
  STOP_NAME="blue"
  SERVER_TO_STOP="server_blue"
  HEALTH_CHECK_URL="http://localhost:3001/health"
fi

echo "현재 활성 서버: $ACTIVE_SERVER"
echo "새 활성 서버: $NEW_ACTIVE_SERVER"

# 새 버전 서버 컨테이너 실행
docker-compose -f docker-compose.${START_NAME}.yaml up -d ${SERVER_TO_START}

# 컨테이너 실행 후 잠시 대기 (예: 10초)
echo "${SERVER_TO_START} 서버를 실행 중입니다. 잠시 기다려 주세요..."
sleep 10

# Health 체크
echo "${SERVER_TO_START} 서버의 상태를 확인합니다..."
HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" ${HEALTH_CHECK_URL})

if [ "$HEALTH_CHECK" -eq 200 ]; then
  echo "${SERVER_TO_START} 서버가 정상적으로 실행되었습니다."

  # nginx 설정 파일 덮어쓰기
  cp ${NEW_CONFIG_FILE} ./weather-server/nginx/nginx.conf

  # nginx 리로드
  docker exec nginx_container nginx -s reload

  echo "nginx 설정이 업데이트되었고 리로드되었습니다."

  # 새로운 활성 서버 정보 업데이트
  echo $NEW_ACTIVE_SERVER > active_server.txt

  # 일정 시간 대기 후 이전 서버 중지 (예: 10초)
  echo "${SERVER_TO_STOP} 서버를 중지합니다. 잠시 기다려 주세요..."
  sleep 10
  docker-compose -f docker-compose.${STOP_NAME}.yaml stop ${SERVER_TO_STOP}

  echo "Blue-Green 전환이 완료되었습니다."
else
  echo "${SERVER_TO_START} 서버가 정상적으로 실행되지 않았습니다. Health 체크 실패."
fi
