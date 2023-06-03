import { Router } from "express";
import { login, signup } from "../controllers/usersControllers";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);

export { router as usersRouter };
