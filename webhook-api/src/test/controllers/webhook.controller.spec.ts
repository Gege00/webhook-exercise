import { expect } from "chai";
import { SinonStub } from "sinon";

import sinon from "ts-sinon";
import { Webhook } from "webhook";

import { WebhookController } from "../../controllers/webhook.controller";
import * as services from "../../services/publisher.service";

describe("U: WebhookController", () => {
  let webHooks: Array<Webhook>;
  let webHookController = new WebhookController();
  let sendMessageStub: SinonStub;
  before(() => {
    sendMessageStub = sinon.stub(services, "sendMessage").resolves();
    webHooks = new Array<Webhook>();
  });

  afterEach(() => {
    webHooks = new Array<Webhook>();
    webHookController = new WebhookController();
  });

  after(() => {
    sendMessageStub.restore();
  });

  describe("registerWebhook", () => {
    it("return the passed body", async () => {
      const result = await webHookController.registerWebhook(
        { url: "test-url", token: "test-token" },
        webHooks
      );
      expect(result).to.deep.equal({ url: "test-url", token: "test-token" });
      expect(webHooks).to.have.length(1);
    });
  });

  describe("testWebhook", () => {
    it("returns the number of webhooks triggerd", async () => {
      webHooks = new Array<Webhook>(
        { url: "test-url-0", token: "test-token-0" },

        { url: "test-url-1", token: "test-token-1" }
      );
      const result = await webHookController.testWebhook(webHooks, {
        payload: ["any", { valid: "JSON" }],
      });

      expect(result).to.equal(2);
    });
  });
});
