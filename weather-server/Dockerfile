FROM node:20.14.0 as build

WORKDIR /app

RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    libnss3 \
    libxss1

# Google Chrome 설치
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
    apt-get update && apt-get install -y google-chrome-stable --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*


ENV PUPPETEER_SKIP_DOWNLOAD true

RUN npm install pm2 -g

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# CMD ["node", "dist/main"]
# CMD ["pm2-runtime", "process.yml", "--only", "APP"]
# process.yml ? => ecosystem.config.js
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--only", "weather-server"]
