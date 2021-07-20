import Koa, { BaseContext } from "koa";
import Router from "koa-router";

import { bootstrapControllers } from "amala";
import { WebhookController } from "./controllers/webhook.controller";

import {Webhook} from "./types/webhook";



const webHooks = Array<Webhook>();
const webHookMiddleware= async (ctx:any, next:any)=>{

        ctx.state.webhooks = webHooks;
        await next()
       
}

const app = new Koa();
const router = new Router();

bootstrapControllers({
  app: app,
  router: router,
  basePath: "/api",
  flow:[webHookMiddleware],
  controllers: [WebhookController],
  attachRoutes: true,
  disableVersioning: true,
}).then(() => {


  app.listen(9876, () => {
    console.log(`Server is running on port 9876`);
  });
});

export default app;
