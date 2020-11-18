// const ObjectID = require("mongodb").ObjectID;

import { ObjectID } from "mongodb";
import { ApolloError } from "apollo-server-express";

import {
  QueryResolvers,
  MutationResolvers,
  // TodoError,
  // TodoResponse,
  // TodoResolvers,
} from "../../codeGenBE";

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
  // Todo: TodoResolvers;
}

export const todoResolvers: Resolvers = {
  Query: {
    todo: async (parent, { _id }, { db }, info) => {
      try {
        // const { _id } = args;
        // const { db } = context;

        const todo = await db
          .db("todos")
          .collection("mine")
          .findOne({ _id: new ObjectID(_id) });

        // if (!todo) {
        //   return {
        //     __typename: "TodoError",
        //     todoError: "Couldn't find todo with that ID",
        //   };
        // }

        // return { __typename: "Todo", ...todo };
        return todo;
      } catch (error) {
        console.log("error :>> ", error);
        // return {
        //   __typename: "TodoError",
        //   todoError: "Something went wrong fetching single todo",
        // };
        return "error";
      }
    },
    todos: async (parent, args, { db }, info) => {
      try {
        // const { _id } = args;
        // const { db } = context;

        const todos = await db
          .db("todos")
          .collection("mine")
          .find({})
          .toArray();

        // if (!todos) {
        //   return {
        //     __typename: "TodoError",
        //     todoError: "Couldn't add todo right now please try again.",
        //   };
        // }
        console.log("typeof todos :>> ", todos);

        // if (typeof todos === "object") {
        // if ("todo" in todos) {
        // if ("todoError" in todos) {
        // if (!todos || todos.length() === 0) {
        //   return { __typename: "TodoError", todoError: "NEW BS ERROR" };
        // } else {
        //   return { __typename: "Todo", ...todos };
        // }
        return todos;
      } catch (error) {
        console.log("error :>> ", error);
        return {
          __typename: "TodoError",
          todoError: "Something went wrong fetching todos.",
        };
      }
    },
  },
  Mutation: {
    makeTodo: async (parent, args, context, info) => {
      try {
        const { db } = context;
        const { content } = args;

        const data = { content: content, status: "INCOMPLETE" };
        const dbRes = await db.db("todos").collection("mine").insertOne(data);

        const newTodo = dbRes.ops[0];

        // return { __typename: "Todo", newTodo };
        return newTodo;
      } catch (error) {
        console.log("error :>> ", error);
        // return {
        //   __typename: "TodoError",
        //   genericMessage: "Something went wrong with makeTodo",
        // };
      }
    },
    updateTodo: async (parent, args, context, info) => {
      try {
        const { db } = context;
        const { _id, content } = args;

        const filter = { _id: new ObjectID(_id) };
        const updates = { $set: { content: content } };
        const options = { returnOriginal: false };

        const dbRes = await db
          .db("todos")
          .collection("mine")
          .findOneAndUpdate(filter, updates, options);

        // return { __typename: "Todo", Todo: dbRes.value };
        return dbRes.value;
      } catch (error) {
        console.log("error :>> ", error);
        // return {
        //   __typename: "TodoError",
        //   genericMessage: "Something went wrong with updateTodo",
        // };
      }
    },
    updateStatus: async (parent, args, context, info) => {
      try {
        const { db } = context;
        const { _id, status } = args;

        const filter = { _id: new ObjectID(_id) };
        const updates = { $set: { status: status } };
        const options = { returnOriginal: false };

        const dbRes = await db
          .db("todos")
          .collection("mine")
          .findOneAndUpdate(filter, updates, options);

        if (!dbRes.value) {
          console.log("Throwing apollo error");
          // return { todoError: "Couldn't find todo!" };
          throw new ApolloError("No todo found", "ID is most likely incorrect");
        }

        // return { __typename: "Todo", Todo: dbRes.value };
        return dbRes.value;
      } catch (error) {
        console.log("IN CATCH");
        console.log("error :>> ", error);
        // return {
        //   __typename: "TodoError",
        //   genericMessage: "Something went wrong",
        // };
      }
    },
    deleteTodo: async (parent, { _id }, { db }, info) => {
      try {
        // const { _id } = args;
        // const { db } = context;

        const dbRes = await db
          .db("todos")
          .collection("mine")
          .deleteOne({ _id: new ObjectID(_id) });

        if (dbRes?.deletedCount === 1) {
          return true;
          // return { __typename: "DeleteSuccess", deleteSuccess: "Todo Deleted" };
        }
        return false;
        // return {
        //   __typename: "TodoError",
        //   genericMessage: "Couldn't find Todo.",
        // };
      } catch (error) {
        console.log("error :>> ", error);
        // return {
        //   __typename: "TodoError",
        //   genericMessage: "Something went wrong!",
        // };
        return false;
      }
    },
  },
};

// export {resolvers};
