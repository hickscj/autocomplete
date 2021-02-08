FROM node:14-stretch

USER node

WORKDIR /home/node

COPY --chown=node:node app .

RUN npm install

CMD ["node", "server.js"]
