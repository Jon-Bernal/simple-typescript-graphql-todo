// const ObjectID = require("mongodb").ObjectID;

import { ApolloError } from "apollo-server-express";
import { ObjectID } from "mongodb";
import { MutationResolvers, QueryResolvers, Status } from "../../codeGenBE";
import { errorFormatter } from "../../utils/errorFormatter";

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
  // Todo: TodoResolvers;
}

export const todoResolvers: Resolvers = {
  Query: {
    todo: async (parent, { _id, userId }, { db }, info) => {
      try {
        // const { _id } = args;
        // const { db } = context;

        const todo = await db
          .db("todos")
          .collection("todos")
          .findOne({ _id: new ObjectID(_id) });

        // if (!todo) {
        //   return {
        //     __typename: "TodoError",
        //     todoError: "Couldn't find todo with that ID",
        //   };
        // }

        // return { __typename: "Todo", ...todo };

        // check if todo belongs to this user and if not throw error
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
    todos: async (parent, { userId }, { db }, info) => {
      try {
        const todos = await db
          .db("todos")
          .collection("todos")
          .find({ userId: userId })
          .toArray();

        if (!todos) {
          return errorFormatter("noTodos", "sorry couldn't find any todos");
        }
        console.log("todos :>> ", todos);

        return { todos };
      } catch (error) {
        console.log("error :>> ", error);
        return errorFormatter("internal", "something went wrong internally");
      }
    },
  },
  Mutation: {
    makeTodo: async (parent, { input }, context, info) => {
      try {
        const { db } = context;
        const { userId, content } = input;

        if (content === "" || typeof content !== "string") {
          return errorFormatter("input", "Please enter content");
        }
        const data = {
          userId: userId,
          content: content,
          status: Status.Incomplete,
        };
        const dbRes = await db.db("todos").collection("todos").insertOne(data);
        console.log("dbRes", dbRes);
        if (dbRes.insertedCount === 1) {
          const newTodo = dbRes.ops[0];
          return { todo: newTodo };
        }
        return errorFormatter(
          "DB",
          "Todo Couldn't be added at this time, sorry"
        );
      } catch (error) {
        console.log("error :>> ", error);
        return errorFormatter("internal", "Something went wrong internally");
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
          .collection("todos")
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
          .collection("todos")
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
      }
    },
    deleteTodo: async (parent, { _id }, { db }, info) => {
      try {
        // const { _id } = args;
        // const { db } = context;

        const dbRes = await db
          .db("todos")
          .collection("todos")
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
