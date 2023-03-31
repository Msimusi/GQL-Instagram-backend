"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = __importDefault(require("./schema"));
const server = new server_1.ApolloServer({ schema: schema_1.default });
const port = process.env.PORT;
// server.listen(PORT).then(() => {
//   console.log(`✅ Server is Running on http://localhost:${PORT}/ 🚀`);
// });
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
