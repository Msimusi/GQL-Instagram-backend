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

import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

// const graphqlUploadExpress = async () => {
//   await dynamicImport("graphql-upload/GraphQLUpload.mjs");
// };

const app = express();
const httpServer = http.createServer(app);

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async () => {
  const port = process.env.PORT;

  await apollo.start();

  app.use(logger("dev"));
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    graphqlUploadExpress(),
    expressMiddleware(apollo, {
      context: async ({ req }) => {
        return {
          loggedInUser: await getUser(req.headers.token),
          protectResolver,
          client,
        };
      },
    })
  );

  // server.listen(PORT).then(() => {
  //   console.log(`✅ Server is Running on http://localhost:${PORT}/ 🚀`);
  // });
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`✅ Server ready at: http://localhost:${port}/graphql 🚀`);
};
startServer();
