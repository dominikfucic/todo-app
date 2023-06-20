import { Router } from "express";
import { getUser, login, signup } from "../controllers/usersControllers";
import { authenticate } from "../middleware";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/getUser", authenticate, getUser);

export { router as usersRouter };
