// const ObjectID = require("mongodb").ObjectID;
// import { ApolloError } from "apollo-server-express";
// import { ObjectID } from "mongodb";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import {
  RegisterResponse,
  // User,
  LoginResponse,
  MutationResolvers,
  QueryResolvers,
} from "../../codeGenBE";
import { registerValidation } from "../../utils/registerValidation";
import { loginValidation } from "../../utils/loginValidation";
import {
  createRefreshToken,
  getToken,
  sendRefreshToken,
  revokeRefreshTokensForUser,
} from "../../auth/auth";
import { ObjectID } from "mongodb";
// import { verify } from "jsonwebtoken";

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}
export const userResolvers: Resolvers = {
  Query: {
    me: async (_, __, { payload, db }, ____) => {
      console.log("payload from me", payload);
      const u = await db
        .db("users")
        .collection("users")
        .findOne({ _id: new ObjectID(payload._id) });
      console.log("u", u);
      if (!u) return null;
      return u;
    },
    // me: async (_, __, { user, db, payload, req }, ____) => {
    //   const authorization = req.headers["authorization"];
    //   if (!authorization) {
    //     return null;
    //   }
    //   try {
    //     const token = authorization.split(" ")[1];
    //     const payloaddd = verify(token, process.env.JWT_SECRET!);
    //     payload = payloaddd as any;
    //     return await db
    //       .db("users")
    //       .collection("users")
    //       .findOne({ _id: payload._id });
    //   } catch (err) {
    //     console.log("err", err);
    //     return null;
    //   }
    // },
    users: async (_, __, { db }, ____) => {
      return await db.db("users").collection("users").find({}).toArray();
    },
    bye: (_, __, { payload }, ____) => {
      console.log("payload from bye", payload);
      if (!payload) {
        return "nope";
      }
      return "laterz";
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
        const newUser = { username, password: hashedPW, tokenVersion: 0 };
        const user = await db.db("users").collection("users").findOne(filter);
        if (user) return { error: { message: "User Already Exists" } };
        const newUserRes = await db
          .db("users")
          .collection("users")
          .insertOne(newUser);
        if (!newUserRes)
          return { error: { message: "Could not add user to DB" } };
        const tokenVersion = newUserRes.ops[0].tokenVersion;
        console.log("tokenVersion", tokenVersion);
        const createToken = getToken(
          newUserRes.ops[0]._id,
          username,
          tokenVersion
        );
        console.log("createToken", createToken);
        return { token: createToken };
      } catch (err) {
        console.log("err", err);
        const error = { message: "Internal Error" };
        return { error };
      }
    },
    login: async (_, { input }, { db, res }, __): Promise<LoginResponse> => {
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
        const tokenVersion = user.tokenVersion;
        sendRefreshToken(res, createRefreshToken(user._id));
        const token = getToken(user._id, user.username, tokenVersion);
        return { token, user };
      } catch (err) {
        console.log(err);
        return { error: { message: "Something went wrong Internally" } };
      }
    },
    logout: async (_, __, { db, payload }, ___): Promise<boolean> => {
      console.log("payload", payload);
      const bool = revokeRefreshTokensForUser(payload._id, db);
      return bool;
    },
    // logout: async (_, __, { res }, ___): Promise<boolean> => {
    //   sendRefreshToken(res, "");
    //   // const bool = revokeRefreshTokensForUser(payload._id, db);
    //   return true;
    // },
  },
};
