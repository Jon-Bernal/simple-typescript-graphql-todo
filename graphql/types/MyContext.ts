import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  db: any;
  connection: any;
  user: { _id: string; username: string };
  payload?: { _id: string; username: string };
}
