import jwt from "jsonwebtoken";

export const getToken = (_id: string, username: string) => {
  return jwt.sign({ _id, username }, `${process.env.JWT_SECRET}`, {
    expiresIn: "10d",
  });
};
