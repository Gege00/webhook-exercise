# webhook-exercise

### The stack used for solving the challenge:
- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)


### How to run the app:

#### *To run the app with Docker:*

Make sure you are using the *Uri for Docker setup* in
- [webhook-api/src/services/publisher.service.ts](./webhook-api/src/services/publisher.service.ts)
- [webhook-consumer/src/consumer.js](webhook-consumer/src/consumer.js)

In the folder, run:
```
docker-compose up --build
```

The webhook API runs on port 9876.

Endpoints:
- POST /api/webhooks
- POST /api/webhooks/test

### Test

## Webhook-api

In the folder run:

```
npm test
```


### Limitations

The solution is not well covered by test. In the ```webhook-api``` project, stubing/mocking the ```amqplib``` is not that straightfoward. It would take extra time to make it work. Mocking the amqplib would have taken the same effort in the ```webhook-consumer``` as well. The endpoint has got no input validations since it wasn't a requirement.

The error and repsonse handling in the consumer service ```webhook-consumer``` project is very basic. As an improvement, it could handle the response from the wehbook:

- Queue the response message back to the queue and let it being handled by an other service
- The possible errors could be handle the same way. 
  
### Future improvements

- Request body validation
- Add config file 
- Persistent webhook storage
- More unit and integration tests