// All resolvers being used are imported here and turned into single reolvers

// array
const { mergeResolvers } = require("@graphql-tools/merge");

import { todoResolvers } from "./todoResolvers";
const combinedResolvers = [todoResolvers];

export const resolvers = mergeResolvers(combinedResolvers);
