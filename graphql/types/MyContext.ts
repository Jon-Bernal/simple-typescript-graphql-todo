import { Request, Response } from "express";
export type MyContext = {
  req: Request;
  res: Response;
  db: any;
  connection: any;
  user: { _id: string; username: string };
};
