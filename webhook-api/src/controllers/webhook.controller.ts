import { Controller, State, Body,Post, Res, Ctx } from "amala";
import { sendMessage, QueueMessage } from "../services/publisher.service";

import { CreateWebhook,CreatePayload, Webhook } from "../types/webhook";

@Controller("/webhooks")
export class WebhookController {
  @Post("/test")
  async testWebhook(
    @State("webhooks") webhooks: Array<Webhook>,
    @Body() body: CreatePayload,
  ): Promise<number> {
    webhooks.forEach(async (x) => {

      const { payload }= body;
      await sendMessage({
        queue: "webhook_trigger",
        data: { url: x.url,token: x.token, payload  },
      });
    });

    const count= webhooks.length;
    webhooks = new Array<Webhook>();

    return count;
    
  }

  @Post("/")
  async registerWebhook(
    @Body({ required: true }) body: CreateWebhook,
    @State("webhooks") webhooks: Array<Webhook>
  ): Promise<Webhook> {
    webhooks.push(body);
    return body;
  }
}
