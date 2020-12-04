// All resolvers being used are imported here and turned into single reolvers

// array
// const { mergeResolvers } = require("@graphql-tools/merge");
import { mergeResolvers } from "@graphql-tools/merge";

// import { commentResolvers } from "./commentResolvers";
// import { todoResolvers } from "./todoResolvers";
import { userResolvers } from "./userResolvers";
const combinedResolvers = [userResolvers];

export const resolvers = mergeResolvers(combinedResolvers as []);
