import jwt from "jsonwebtoken";

export const authenticate: Handler = async (req, res, next) => {
  const token = req.headers["authorization"];
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded: DecodedJwtPayload) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        req.userId = decoded.userId;
        next();
      }
    }
  );
};
