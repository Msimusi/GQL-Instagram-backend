import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const { pathname: dir } = new URL(".", import.meta.url);

console.log(dir);

const loadedTypes = loadFilesSync(`${dir}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${dir}/**/*.{queries,mutations}.js`);

console.log(loadedTypes, loadedResolvers);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
