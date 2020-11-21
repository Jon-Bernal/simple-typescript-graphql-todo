// const ObjectID = require("mongodb").ObjectID;
import { ApolloError } from "apollo-server-express";
import { ObjectID } from "mongodb";
import { MutationResolvers, QueryResolvers } from "../../codeGenBE";

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}
export const userResolvers: Resolvers = {
  Query: {
    user: async (parent, { _id }, { db }, info) => {
      try {
        const user = await db.db("todos").collection("users").findOne({ _id });
        return user;
      } catch (error) {
        console.log("error :>> ", error);
        return "error";
      }
    },
    users: async (_, __, { db }) => {
      try {
        const users = await db.db("todos").collection("users").find();

        console.log("users :>> ", users);

        return users;
      } catch (error) {
        console.log("error :>> ", error);
        return "error";
      }
    },
    me: async (_, { _id }, { db }) => {
      try {
        const user = await db.db("todos").collection("users").findOne({ _id });

        console.log("users :>> ", user);

        return user;
      } catch (error) {
        console.log("error :>> ", error);
        return "error";
      }
    },
    getUserData: async (parent, { _id }, { db }, info) => {
      try {
        const user = await db
          .db("todos")
          .collection("users")
          .findOne({ _id: new ObjectID(_id) });
        console.log("user", user);
        if (!user) {
          throw new ApolloError("Error Will");
          // return {
          //   __typename: "UserDataError",
          //   message: "Couldn't find user at that id",
          // };
        }
        const filter = { userId: _id };
        const usersTodos = await db
          .db("todos")
          .collection("todos")
          .find({})
          .toArray();
        console.log("usersTodos", usersTodos);

        const userComments = await db
          .db("todos")
          .collection("comments")
          .find({ userId: _id })
          .toArray();
        // if (!userComments) throw "no comments found"
        console.log("userComments", userComments);

        return {
          // ___typename: "UserDataRes",
          user: user,
          todos: usersTodos,
          comments: userComments ? userComments : [],
        };
      } catch (err) {
        console.log("err");
        throw new ApolloError("Error Will");
        // return {
        //   ___typename: "UserDataError",
        //   message: "Something went horribly wrong",
        // };
      }
    },
  },
  Mutation: {
    register: async (parent, { input }, { db }, info) => {
      const { username, password, confirmPassword } = input;
      try {
        const filter = { username };
        const newUser = { username, password };
        const user = await db.db("todos").collection("users").findOne(filter);
        if (user) {
          return {
            __typename: "RegisterError",
            message: "Username already exists",
          };
        } else {
          // make token and return token
          const newUserRes = await db
            .db("todos")
            .collection("users")
            .insertOne(newUser);
          if (!newUserRes) {
            return {
              __typename: "RegisterError",
              message: "Could not add user to DB",
            };
          } else {
            const token = newUserRes?.ops[0]._id;
            return {
              __typename: "Token",
              token: token,
            };
          }
        }
      } catch (err) {
        return {
          __typename: "RegisterError",
          message: "Internal Service Issues",
        };
      }
    },
    login: async (parent, { input }, { db }, info) => {
      const { username, password } = input;
      try {
        const user = await db
          .db("todos")
          .collection("users")
          .findOne({ username });

        if (!user)
          return { __typename: "LoginError", message: "No user found" };

        // check password
        if (user.password !== password)
          return { __typename: "LoginError", message: "Wrong Password" };

        return { __typename: "Token", token: user._id };
      } catch (error) {
        throw new ApolloError("user not found, or something");
      }
    },
  },
};
