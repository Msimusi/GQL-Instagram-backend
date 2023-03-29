import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema.js";

const server = new ApolloServer({ schema });
const PORT: any = process.env.PORT;

// server.listen(PORT).then(() => {
//   console.log(`✅ Server is Running on http://localhost:${PORT}/ 🚀`);
// });

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`🚀  Server ready at: ${url}`);
