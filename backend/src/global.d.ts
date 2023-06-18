import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

declare global {
  type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

  interface Todo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    completed: boolean;
    userId: mongoose.Types.ObjectId;
  }

  interface User {
    _id?: mongoose.Types.ObjectId;
    fullName: string;
    email: string;
    password: string | Buffer;
    salt: Buffer;
  }

  namespace Express {
    interface Request {
      userId?: mongoose.Types.ObjectId;
    }
  }

  interface DecodedJwtPayload extends JwtPayload {
    userId?: mongoose.Types.ObjectId;
  }
}
