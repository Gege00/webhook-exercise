FROM node:15.5-alpine

WORKDIR /home/node/webhook-api/

COPY package*.json ./
COPY tsconfig*.json ./
COPY nodemon.json ./

RUN npm i

CMD ["npm", "run", "start:dev"]

