import * as dotenv from "dotenv";
import cors from "cors";
import http from "http";
// const jwt = require("jsonwebtoken");
const express = require("express");
// const mongoose = require("mongoose");
const {
  ApolloServer,
  AuthenticationError,
  PubSub,
} = require("apollo-server-express");
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
// const models = require("./mongooseModels");

const bodyParser = require("body-parser");
import * as mongodb from "mongodb";
const { MongoClient } = mongodb;
// const MongoClient = require("mongodb").MongoClient;

dotenv.config({ path: __dirname + "/.env" });
//options for cors midddleware

// const options: cors.CorsOptions = {
//   allowedHeaders: [
//     "Origin",
//     "X-Requested-With",
//     "Content-Type",
//     "Accept",
//     "X-Access-Token",
//   ],
//   credentials: true,
//   methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//   origin: "http://localhost:5000",
//   preflightContinue: false,
// };

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const isUserFound = async (req: any) => {
//   console.log("typeof req :>> ", typeof req);
//   // console.log("Running isUserFound");
//   const token = req.headers.authorization;
//   if (token) {
//     // console.log("We Have A Token!!!");
//     try {
//       console.log({ token });
//       const actualToken = token.replace(/Bearer\s/, "");
//       // console.log("actualToken", actualToken);
//       return jwt.verify(actualToken, process.env.SECRET, (err, decoded) => {
//         console.log("err", err);
//         console.log("decoded", decoded);
//         return decoded;
//       });
//     } catch (err) {
//       console.log("Error in catch block");
//       console.log({ err });
//       throw new AuthenticationError("Your session expired. Sign in again.");
//     }
//   }
// };
const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
  },
  context: async ({ req }: any) => {
    // if (connection) {
    // return connection.context;
    // } else {
    // console.log("req.body", req);
    // const user = await isUserFound(req);
    // console.log({ user });
    // return { db, user, secret: process.env.SECRET, req };
    // return {};
    // }
    return { db, secret: process.env.SECRET, req, pubsub };
  },
});
server.applyMiddleware({ app }); //import

// const httpServer = http.createServer(app);
// server.installSubscriptionHandlers(httpServer);

try {
  const port = process.env.Port || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
  // httpServer.listen(port, () => {
  //   console.log(`Server running on port ${port}`);
  //   console.log(
  //     `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  //   );
  // });
} catch (err) {
  console.log("err", err);
}
