import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import { login, signup } from "../src/controllers/usersControllers";
import { User } from "../src/models/User";
import crypto from "node:crypto";
import jwt, { sign } from "jsonwebtoken";

describe("/users", () => {
  let req: Request, res: Response, next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any as Response;
    next = jest.fn() as NextFunction;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login user and return token", async () => {
    req = {
      body: {
        email: "test@mail.com",
        password: "12345",
      },
      userId: new mongoose.Types.ObjectId(),
    } as any as Request;

    crypto.randomBytes = jest.fn().mockReturnValue("randomBytes");

    const user = {
      _id: "mockedId",
      salt: "randomBytes",
      password: crypto.pbkdf2Sync(
        req.body.password,
        "randomBytes",
        100000,
        64,
        "sha512"
      ),
    };

    User.findOne = jest.fn().mockResolvedValue(user);
    crypto.pbkdf2 = jest.fn(
      (password, salt, iterations, keylen, digest, cb) => {
        cb(null, user.password);
      }
    );
    crypto.timingSafeEqual = jest.fn().mockResolvedValue(true);

    jwt.sign = jest.fn().mockReturnValue("mockedToken");
    await login(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "mockedToken" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should make new user and return token", async () => {
    req = {
      body: {
        email: "test@mail.com",
        password: "12345",
      },
      userId: new mongoose.Types.ObjectId(),
    } as any as Request;

    crypto.randomBytes = jest.fn().mockReturnValue("randomBytes");

    const user = {
      email: req.body.email,
      salt: "randomBytes",
      password: crypto.pbkdf2Sync(
        req.body.password,
        "randomBytes",
        100000,
        64,
        "sha512"
      ),
    };

    crypto.pbkdf2 = jest.fn(
      (password, salt, iterations, keylen, digest, cb) => {
        cb(null, user.password);
      }
    );

    User.create = jest.fn().mockResolvedValue({ ...user, _id: "mockedId" });
    jwt.sign = jest.fn().mockReturnValue("mockedToken");

    await signup(req, res, next);

    expect(User.create).toHaveBeenCalledWith(user);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "mockedToken" });
    expect(next).not.toHaveBeenCalled();
  });
});
