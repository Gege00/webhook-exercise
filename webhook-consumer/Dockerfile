FROM keymetrics/pm2:latest-alpine

WORKDIR /home/node/webhook-consumer/

COPY package*.json ./
COPY process.yml ./

RUN npm i

CMD [ "pm2-dev", "process.yml" ]