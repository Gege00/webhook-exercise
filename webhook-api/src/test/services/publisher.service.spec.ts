// import sinon,{ stub } from "ts-sinon/node_modules/@types/sinon";
// import { expect } from "chai";

// import {
//   sendMessage,
//   QueueMessage,
// } from "../../services/publisher.service"
// import amqplib, { Channel,Connection} from "amqplib";

// import {ImportMock} from "ts-mock-imports"



// const amqplibMock = {
//   createChannel: async () => {
//     assertQueue: async () => {
//       sendToQueue: () => {};
//       queue: {
//         name: "test-queue";
//       }
//     };
//     close: async () => {};
//   },
//   close: async()=>{}

 
// }

// const amqplibStub = ImportMock.mockFunction(amqplib, "connect", async ( options:any )=> amqplibMock );



// const amqplibStub = sinon.stub(amqplib,"connect").resolves({
//   amqplibMock
// })

// describe("U: AMQP publisher", () => {
//   describe("sendMessage", () => {
//     it("resolves with true", async () => {
//       const result = await sendMessage({
//         queue: "test-queue",
//         data: {
//           url: "test-url",
//           token: "test-token",
//           payload: ["any", { valid: "JSON" }],
//         },
//       });
//       console.log();
//       expect(result).to.equal(true);
//     });
//   });
// });
