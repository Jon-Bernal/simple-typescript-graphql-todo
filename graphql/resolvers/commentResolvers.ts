// const ObjectID = require("mongodb").ObjectID;
import { ApolloError, UserInputError } from "apollo-server-express";
import { randomBytes } from "crypto";
import { ObjectID } from "mongodb";
import { MutationResolvers, QueryResolvers } from "../../codeGenBE";

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}
export const commentResolvers: Resolvers = {
  Query: {
    getComments: async (parents, { userId }, { db }, info) => {
      try {
        const comments = await db
          .db("todos")
          .collection("comments")
          .find({ userId })
          .toArray();

        return comments;
      } catch (error) {
        console.log("error", error);
        throw new ApolloError("Sorry, couldn't fetch the comments");
      }
    },
    getAllComments: async (parents, args, { db }, info) => {
      try {
        const comments = await db
          .db("todos")
          .collection("comments")
          .find()
          .toArray();

        return comments;
      } catch (err) {
        console.log("err", err);
        throw new ApolloError("something went wrong in our insides");
      }
    },
  },
  Mutation: {
    makeComment: async (parents, { userId, comment }, { db }, info) => {
      try {
        const dbRes = await db
          .db("todos")
          .collection("comments")
          .insertOne({ userId, comment });
        console.log("dbRes", dbRes);

        if (!dbRes.ops[0]) throw dbRes;
        return dbRes.ops[0];
      } catch (error) {
        console.log("error", error);
        throw new ApolloError("Sorry, couldn't make this comment.");
      }
    },
    updateComment: async (_, { _id, comment }, { db }) => {
      try {
        if (typeof comment !== "string" || comment.length === 0)
          throw new UserInputError("Comment is empty");

        const filter = { _id: new ObjectID(_id) };
        const data = { $set: { comment } };
        const options = { returnOriginal: false };
        const updatedComment = await db
          .db("todos")
          .collection("comments")
          .findOneAndUpdate(filter, data, options);

        if (!updatedComment.value) {
          throw new ApolloError("couldn't update, sorry");
        }
        return updatedComment.value;
      } catch (err) {
        console.log("err", err);
        throw new ApolloError("sorry, couldn't update this comment.");
      }
    },
    deleteComment: async (_, { _id, userId }, { db }) => {
      try {
        const filter = { _id: new ObjectID(_id) };
        const foundComment = await db
          .db("todos")
          .collection("comments")
          .findOne(filter);
        console.log("foundComment", foundComment);
        if (!foundComment) throw "no comment found";
        if (foundComment?.userId !== userId) throw "no permission";

        const isDeleted = await db
          .db("todos")
          .collection("comments")
          .deleteOne({ _id: new ObjectID(_id) });
        // console.log("isDeleted:", isDeleted)
        if (isDeleted.deletedCount === 0) throw "0 deleted";
        return true;
      } catch (err) {
        console.log("err", err);
        switch (err) {
          case "no permission":
            throw new ApolloError(
              "You don't have permissions to delete this comment"
            );
          case "no comment found":
            throw new ApolloError("no comment found");
          case "0 deleted":
            throw new ApolloError("Sorry couldn't delete this comment.");

          default:
            throw new ApolloError("Internal error, :( ");
        }
      }
    },
  },
};
