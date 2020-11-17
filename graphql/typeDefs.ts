// !Note: If changes are made to this file, make the same changes to the typeDefsGen.ts file (but not to the inport and export syntax)
// All typeDefs are put inside the ./types folder and automagically added in.
import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const typesArray = loadFilesSync(path.join(__dirname, "./types"));
const typeDefs = mergeTypeDefs(typesArray);

export { typeDefs };
