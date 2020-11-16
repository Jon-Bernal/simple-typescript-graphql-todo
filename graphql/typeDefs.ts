// All typeDefs are put inside the ./types folder and automagically added in.
import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const typesArray: any = loadFilesSync(path.join(__dirname, "./types"));

export const typeDefs = mergeTypeDefs(typesArray);
