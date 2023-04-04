require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import { resolvers, typeDefs } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";
import client from "./client";

const port = process.env.PORT;
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(() => {
  app.use(logger("dev"));
  app.use(
    "/",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          loggedInUser: await getUser(req.headers.token),
          protectResolver,
          client,
        };
      },
    })
  );
});

// server.listen(PORT).then(() => {
//   console.log(`✅ Server is Running on http://localhost:${PORT}/ 🚀`);
// });

httpServer.listen({ port }, () => {
  console.log(`✅ Server ready at: http://localhost:${port} 🚀`);
});
