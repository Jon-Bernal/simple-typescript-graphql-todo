import { ObjectID } from "mongodb";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { __prod__ } from "../constants";

export const getToken = (
  _id: string,
  username: string,
  tokenVersion: number
) => {
  return jwt.sign({ _id, username, tokenVersion }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (_id: string, tVerz = 0) => {
  return jwt.sign(
    { _id: _id, tokenVersion: tVerz },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  console.log("token from sendRefreshToken", token);
  console.log("__prod__", __prod__);
  res.cookie(process.env.COOKIE_NAME!.toString(), token, {
    httpOnly: __prod__,
    // sameSite: "lax",
    secure: __prod__,
  });
  const test = res.cookie;
  console.log("res.cookie", test);
};

export const revokeRefreshTokensForUser = async (
  userId: string,
  db: any
): Promise<boolean> => {
  const filter = { _id: new ObjectID(userId) };
  const update = { $inc: { tokenVersion: 1 } };
  const tokenUpdate = await db
    .db("users")
    .collection("users")
    .findOneAndUpdate(filter, update);
  console.log("tokenUpdate", tokenUpdate);
  return true;
};
