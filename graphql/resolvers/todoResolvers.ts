// const ObjectID = require("mongodb").ObjectID;

import { ObjectID } from "mongodb";

export default {
  Query: {
    todo: async (parent, args, context, info) => {
      try {
        const { _id } = args;
        const { db } = context;

        const todo: any = await db
          .db("todos")
          .collection("mine")
          .findOne({ _id: new ObjectID(_id) });

        return todo;
      } catch (error) {
        console.log("error :>> ", error);
      }
    },
    todos: async (parent, args, context, info) => {
      try {
        const { _id } = args;
        const { db } = context;

        const todos = await db
          .db("todos")
          .collection("mine")
          .find({})
          .toArray();

        return todos;
      } catch (error) {
        console.log("error :>> ", error);
      }
    },
  },
  Mutation: {
    makeTodo: async (parent: any, args: any, context: any, info: any) => {
      try {
        const { db } = context;
        const { content } = args;

        const data = { content: content, status: "INCOMPLETE" };
        const dbRes = await db.db("todos").collection("mine").insertOne(data);

        const newTodo = dbRes.ops[0];

        return newTodo;
      } catch (error) {}
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

        return dbRes.value;
      } catch (error) {
        console.log("error :>> ", error);
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

        return dbRes.value;
      } catch (error) {
        console.log("error :>> ", error);
      }
    },
    deleteTodo: async (parent, args, context, info) => {
      try {
        const { _id } = args;
        const { db } = context;

        const dbRes = await db
          .db("todos")
          .collection("mine")
          .deleteOne({ _id: new ObjectID(_id) });

        if (dbRes?.deletedCount === 1) {
          return true;
        }
        return false;
      } catch (error) {
        console.log("error :>> ", error);
        return false;
      }
    },
  },
};
