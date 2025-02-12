FROM node:20.14.0 as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3003

CMD [ "node", ".output/server/index.mjs" ]
