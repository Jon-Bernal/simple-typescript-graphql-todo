import { Request } from "express";
import { verify } from "jsonwebtoken";

export const isAuth = (req: Request, next: any) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authorized");
  }

  try {
    const token = authorization.split("")[1];
    const payload = verify(token, process.env.JWT_SECRET!);
    // context.payload = payload as any;
  } catch (err) {
    console.log("err from auth middleware", err);
    throw new Error("not authorized");
  }

  return next();
};
