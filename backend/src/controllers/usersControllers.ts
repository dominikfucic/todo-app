import jwt from "jsonwebtoken";
import { User } from "../models/User";
import crypto from "node:crypto";
import { MongoServerError } from "mongodb";

export const login: Handler = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    crypto.pbkdf2(
      req.body.password,
      user.salt,
      100000,
      64,
      "sha512",
      async (error, password) => {
        if (error) {
          next(error);
          return;
        }
        if (crypto.timingSafeEqual(user.password as Buffer, password)) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          res.status(200).json({ token });
        } else {
          res.status(404).json({ message: "Incorrect password." });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

export const signup: Handler = async (req, res, next) => {
  try {
    const salt = crypto.randomBytes(64);
    crypto.pbkdf2(
      req.body.password,
      salt,
      100000,
      64,
      "sha512",
      async (error, hashedPassword) => {
        if (error) {
          next(error);
          return;
        }
        const user: User = {
          fullName: req.body.fullName,
          email: req.body.email,
          password: hashedPassword,
          salt: salt,
        };
        try {
          await User.create(user);
        } catch (error) {
          if (error instanceof MongoServerError && error.code === 11000) {
            res.status(409).json({ message: "User already exists." });
            return;
          } else {
            throw new Error(error);
          }
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getUser: Handler = async (req, res, next) => {
  try {
    let user = await User.findById(req.userId).select("-password -salt");
    if (!user) {
      res.status(401).json({ message: "Unauthorized." });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
