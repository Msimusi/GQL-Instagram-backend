require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema";

const server = new ApolloServer({ schema });
const port: any = process.env.PORT;

// server.listen(PORT).then(() => {
//   console.log(`✅ Server is Running on http://localhost:${PORT}/ 🚀`);
// });

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
