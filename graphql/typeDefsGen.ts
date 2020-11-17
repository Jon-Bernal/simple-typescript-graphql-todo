// !NOTE: THIS IS ONLY FOR CODEGEN, IF CHANGES ARE MADE TO TYPEDEFS.ts CHANGE THIS TO REFLECT THOSE CHANGES, BUT DON"T CHANGE THE IMPORT AND EXPORT STYLES, IT WILL BREAK!!!!! and god save us if you do...

// All typeDefs are put inside the ./types folder and automagically added in.
// import path from "path";
const path = require("path");
// import { loadFilesSync } from "@graphql-tools/load-files";
const { loadFilesSync } = require("@graphql-tools/load-files");
// import { mergeTypeDefs } from "@graphql-tools/merge";
const { mergeTypeDefs } = require("@graphql-tools/merge");

const typesArray = loadFilesSync(path.join(__dirname, "./types"));

// const typeDefs = mergeTypeDefs(typesArray);

const typeDefs = mergeTypeDefs(typesArray);

// export default { typeDefs };
module.exports = typeDefs;
