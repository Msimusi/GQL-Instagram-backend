require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema, { resolvers, typeDefs } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";
import client from "./client";

const server = new ApolloServer({ resolvers, typeDefs });
const port: any = process.env.PORT;

// server.listen(PORT).then(() => {
//   console.log(`✅ Server is Running on http://localhost:${PORT}/ 🚀`);
// });

startStandaloneServer(server, {
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
      client,
    };
  },

  listen: { port },
}).then(({ url }) => console.log(`✅ Server ready at: ${url} 🚀`));
