import jwt from "jsonwebtoken";
import { User } from "../models/User";
import crypto from "node:crypto";

export const login: Handler = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    crypto.pbkdf2(
      req.body.password,
      user.salt,
      100000,
      64,
      "sha512",
      async (error, password) => {
        if (error) next(error);
        if (crypto.timingSafeEqual(user.password as Buffer, password)) {
          const token = jwt.sign({ userId: user._id }, "your_secret_key", {
            // ovaj secret key cu kasnije generirati sa crypto.createPrivateKey
            expiresIn: "1h",
          });
          res.status(200).json({ token });
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
        if (error) next(error);
        const user: User = {
          email: req.body.email,
          password: hashedPassword,
          salt: salt,
        };
        await User.create(user);
        const token = jwt.sign({ userId: user._id }, "your_secret_key", {
          expiresIn: "1h",
        });

        res.status(200).json({ token });
      }
    );
  } catch (error) {
    next(error);
  }
};
