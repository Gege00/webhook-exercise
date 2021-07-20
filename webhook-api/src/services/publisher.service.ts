import * as amqplib from "amqplib";

const AMQP_ADDRESS = "amqp://rabbitmq?heartbeat=60";

//URI for local use
// const AMQP_ADDRESS = "amqp://localhost:5672?heartbeat=60"

export async function sendMessage(message: QueueMessage): Promise<boolean> {
  try {
    const connection = await amqplib.connect(AMQP_ADDRESS);
    const channel = await connection.createChannel();

    const res = await channel.assertQueue(message.queue, { durable: true });
    if (!res.queue) throw new Error("failed to open the queue");

    channel.sendToQueue(
      message.queue,
      Buffer.from(JSON.stringify(message.data)),
      { deliveryMode: true }
    );

    await channel.close();
    await connection.close();
    return true;
  } catch (e) {
    return false;
  }
}

export interface QueueMessage {
  queue: string;
  data: {
    url: string;
    token: string;
    payload: any;
  };
}
