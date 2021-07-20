const amqp = require("amqplib");
const superagent = require("superagent");

const rabbitmq = "amqp://rabbitmq?heartbeat=60";

//URI for local use
//const rabbitmq = "amqp://localhost:5672?heartbeat=60"

const startConsumer = async () => {
  console.log("Consumer starting...");
  try {
    const conn = await amqp.connect(rabbitmq);

    conn.on("error", function (error) {
      throw new Error("[AMQP] conn error", error.message);
    });

    const ch = await conn.createChannel();

    ch.on("error", function (error) {
      throw new Error("[AMQP] conn error", error.message);
    });

    await ch.assertQueue("webhook_trigger", { durable: true });
    ch.prefetch(1);
    ch.consume(
      "webhook_trigger",
      async (message) => {
        try {
          var webhook = JSON.parse(message.content);

          const data = ({ token, payload } = webhook);

          const res = await superagent.post(webhook.url).send(data);

          //do something with the response
          //log it, queue it, process it whatever
          ch.ack(message);
        } catch (e) {
          //if any error occurs, should I cancel the request or ack it???
          //Some error logging to be implemented here
          //Option: send error on the event queue and let another service take care of it
          //let's cancel it for now
          //console.log(e);
          console.error(e.message);
          ch.cancel(message);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = { startConsumer };
