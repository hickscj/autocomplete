FROM node:14-stretch

RUN npm install -g nodemon

USER node

WORKDIR /home/node

COPY --chown=node:node app .

RUN npm ci

CMD ["nodemon", "server.js"]
