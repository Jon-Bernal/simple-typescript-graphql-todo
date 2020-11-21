// All resolvers being used are imported here and turned into single reolvers

// array
const { mergeResolvers } = require("@graphql-tools/merge");

import { commentResolvers } from "./commentResolvers";
import { todoResolvers } from "./todoResolvers";
import { userResolvers } from "./userResolvers";
const combinedResolvers = [todoResolvers, userResolvers, commentResolvers];

export const resolvers = mergeResolvers(combinedResolvers);
