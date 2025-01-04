FROM node:20.14.0 as build

WORKDIR /app

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

RUN npm install pm2 -g

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true 
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# CMD ["node", "dist/main"]
# CMD ["pm2-runtime", "process.yml", "--only", "APP"]
# process.yml ? => ecosystem.config.js
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--only", "weather-server"]
