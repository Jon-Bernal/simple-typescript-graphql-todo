// const ObjectID = require("mongodb").ObjectID;
// import { ApolloError } from "apollo-server-express";
// import { ObjectID } from "mongodb";
import bcrypt from "bcryptjs";
import {
  RegisterResponse,
  LoginResponse,
  MutationResolvers,
  QueryResolvers,
} from "../../codeGenBE";
import { registerValidation } from "../../utils/registerValidation";
import { getToken } from "../../utils/getToken";
import { loginValidation } from "../../utils/loginValidation";

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}
export const userResolvers: Resolvers = {
  Query: {
    hello: async (_, __, ___, ____) => {
      return "hello";
    },
  },
  Mutation: {
    register: async (_, { input }, { db }, __): Promise<RegisterResponse> => {
      const { username, password, confirmPassword } = input;
      try {
        const errors = registerValidation(username, password, confirmPassword);
        if (errors.length > 0) return { errors };
        const filter = { username };
        const hashedPW = await bcrypt.hash(password, 12);
        const newUser = { username, password: hashedPW };
        const user = await db.db("users").collection("users").findOne(filter);
        if (user) return { error: { message: "User Already Exists" } };
        const newUserRes = await db
          .db("users")
          .collection("users")
          .insertOne(newUser);
        if (!newUserRes)
          return { error: { message: "Could not add user to DB" } };
        const createToken = getToken(newUserRes.ops[0]._id, username);
        return { token: createToken };
      } catch (err) {
        console.log("err", err);
        const error = { message: "Internal Error" };
        return { error };
      }
    },
    login: async (_, { input }, { db }, __): Promise<LoginResponse> => {
      try {
        const { username, password } = input;
        const isValidLogin = loginValidation(username, password);
        if (isValidLogin.length > 0) return { errors: isValidLogin };
        const user = await db
          .db("users")
          .collection("users")
          .findOne({ username });
        if (!user) return { error: { message: "No user with that username" } };
        const validPW = await bcrypt.compare(password, user.password);
        if (!validPW) return { error: { message: "Invalid Credentials" } };
        const token = getToken(user._id, user.username);
        return { token, user };
      } catch (err) {
        console.log(err);
        return { error: { message: "Something went wrong Internally" } };
      }
    },
  },
};
