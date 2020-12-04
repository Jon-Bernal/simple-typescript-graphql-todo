import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import http from "http";
import jwt from "jsonwebtoken";

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

// db is an object
let db: any; // TODO: Change any to whatever type it really is.
MongoClient.connect(
  `${process.env.MONGO_STRING}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err: any, database: any) => {
    // TODO: change the types above when you figure out what they should be.
    // this is an object
    console.log("typeof err :>> ", typeof err);
    if (err) {
      return console.error(err);
    }
    db = database;
    console.log("type of db: ", typeof db);
  }
);

const app = express();
// app.use(cors(options));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
  },
  context: async ({ req, connection }: MyContext) => {
    if (connection) {
      console.log("in connection if block");
      connection.pubsub = pubsub;
      return { connection };
    } else {
      const token = req.headers.authorization || "";
      try {
        const user = jwt.verify(
          token.split(" ")[1],
          `${process.env.JWT_SECRET}`
        );
        if (!user) throw new Error("Token is invalid, please log in");
        return { db, secret: process.env.SECRET, req, pubsub, user };
      } catch (err) {
        console.log("err");
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
