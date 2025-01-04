FROM node:20.14.0 as build

WORKDIR /app

RUN apt-get update && apt-get install -y libnss3

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
