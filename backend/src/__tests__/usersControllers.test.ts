import { Response, Request, NextFunction } from "express";
import { getUser, login, signup } from "../controllers/usersControllers";
import { User } from "../models/User";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { MongoServerError } from "mongodb";

describe("/api/users", () => {
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

  describe("POST /login", () => {
    it("should return a json response with error message if user is not found", async () => {
      const req = {
        body: {
          email: "test@mail.com",
        },
      } as any as Request;

      User.findOne = jest.fn().mockResolvedValue(null);

      await login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found." });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return a json response with error message if password is incorrect", async () => {
      req = {
        body: {
          email: "test@mail.com",
          password: "12345",
        },
        userId: "mockedId",
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
      crypto.timingSafeEqual = jest.fn().mockReturnValue(false);

      await login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Incorrect password." });
      expect(next).not.toHaveBeenCalled();
    });

    it("should login user and return token", async () => {
      req = {
        body: {
          email: "test@mail.com",
          password: "12345",
        },
        userId: "mockedId",
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
  });

  describe("POST /signup", () => {
    it("should make new user and return token", async () => {
      req = {
        body: {
          fullName: "Test User",
          email: "test@mail.com",
          password: "12345",
        },
        userId: "mockedId",
      } as any as Request;

      crypto.randomBytes = jest.fn().mockReturnValue("randomBytes");

      const user = {
        fullName: req.body.fullName,
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

    it("should return an error if user already exists", async () => {
      req = {
        body: {
          fullName: "Test User",
          email: "test@mail.com",
          password: "12345",
        },
        userId: "mockedId",
      } as any as Request;

      crypto.randomBytes = jest.fn().mockReturnValue("randomBytes");

      const user = {
        fullName: req.body.fullName,
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

      User.create = jest
        .fn()
        .mockRejectedValue(new MongoServerError({ code: 11000 }));

      await signup(req, res, next);

      expect(User.create).toHaveBeenCalledWith(user);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: "User already exists.",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("POST /getUser", () => {
    it("should authenticate user and return user", async () => {
      const req = {
        userId: "mockedId",
      } as any as Request;

      const user = {
        _id: "mockedId",
        fullName: "Test User",
        email: "test@mail.com",
      };

      User.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(user),
      });

      await getUser(req, res, next);

      expect(User.findById).toHaveBeenCalledWith(req.userId);
      expect(User.findById(req.userId).select).toHaveBeenCalledWith(
        "-password -salt"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
      expect(next).not.toHaveBeenCalled();
    });

    it("should return an error if user is not found", async () => {
      const req = {
        userId: "mockedId",
      } as any as Request;

      User.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue(null),
      });

      await getUser(req, res, next);

      expect(User.findById).toHaveBeenCalledWith(req.userId);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized." });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
