import * as dotenv from "dotenv-safe";
dotenv.config();
// import "dotenv/config";
import cors from "cors";
import http from "http";
import { verify } from "jsonwebtoken";

// const jwt = require("jsonwebtoken");
import express from "express";
import { ApolloServer, PubSub } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import bodyParser from "body-parser";
import * as mongodb from "mongodb";
const { MongoClient } = mongodb;
// const MongoClient = require("mongodb").MongoClient;
import { MyContext } from "./graphql/types/MyContext";
import cookieParser from "cookie-parser";
import { createRefreshToken, getToken, sendRefreshToken } from "./auth/auth";
import { ObjectID } from "mongodb";
// import { isAuth } from "./auth/isAuthMiddleware";

// db is an object
let db: any; // TODO: Change any to whatever type it really is.
MongoClient.connect(
  `${process.env.MONGO_STRING}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err: any, database: any) => {
    // TODO: change the types above when you figure out what they should be.
    // this is an object
    if (err) {
      return console.error(err);
    }
    db = database;
  }
);

const app = express();
app.use(cookieParser());
const corsOptions = {
  origin: [
    "https://studio.apollographql.com",
    "ws://studio.apollographql.com",
    "ws://localhost:4000/graphql",
    "http://localhost:3000",
    "http://localhost:4000/graphql",
  ],
  //exposedHeaders: "Set-Cookie",
  credentials: true,
  //httpOnly: true,
};
app.use(cors(corsOptions));
app.post("/refresh_token", async (req, res) => {
  const token = req.cookies[process.env.COOKIE_NAME!];
  //const token = req.cookies[process.env.COOKIE_NAME!];
  if (!token) {
    return res.send({ ok: false, token: "" });
  }
  let payload: any = null;
  try {
    payload = verify(token, process.env.JWT_REFRESH_SECRET!);
  } catch (err) {
    console.log("err from cookie", err);
    return res.send({ ok: false, token: "" });
  }
  console.log("payload from index", payload);
  const user = await db
    .db("users")
    .collection("users")
    .findOne({ _id: new ObjectID(payload._id) });
  console.log("user", user);
  if (!user) {
    return res.send({ ok: false, token: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, token: "" });
  }
  sendRefreshToken(res, createRefreshToken(user._id));
  return res.send({
    ok: true,
    token: getToken(user._id, user.username, user.tokenVersion),
  });
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(isAuth);

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
  },
  context: async ({ req, res, connection }: MyContext) => {
    if (connection) {
      console.log("in connection if block");
      connection.pubsub = pubsub;
      return { connection };
    } else {
      let authorization;
      try {
        console.log("req.headers", req.headers);
        authorization = req.headers["authorization"];
        console.log("authorization", authorization);

        if (!authorization) {
          console.log("not authed up");
          authorization = undefined;
          return { db, secret: process.env.SECRET, req, res, pubsub };
        } else {
          const token = authorization.split("")[1];
          const payload = verify(token, process.env.JWT_SECRET!);
          console.log("payload", payload);
          // context.payload = payload as any;
          return { db, secret: process.env.SECRET, req, res, pubsub, payload };
        }
      } catch (err) {
        console.log("err", err);
        throw new Error("Internal Error.");
      }
    }
  },
});
server.applyMiddleware({ app, cors: false }); //import

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

try {
  const port = process.env.PORT || 5000;
  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(
      `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
    );
  });
} catch (err) {
  console.log("err", err);
}
