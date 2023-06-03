import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const authenticate: Handler = async (req, res, next) => {
  const token = req.headers['authorization']
  jwt.verify(token, "your_secret_key", (err, decoded: DecodedJwtPayload) => {                      // ovaj secret key cu kasnije
    if (err) {                                                                  // generirati sa crypto.createPrivateKey
      // Token is invalid or expired
      res.status(401).json({ error: "Unauthorized" });
    } else {
      // Token is valid, store the authenticated user in the request object
      req.userId = decoded.userId
      next();
    }
  });
};
