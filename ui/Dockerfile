FROM node:14-alpine

WORKDIR /home/node/ui

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build
