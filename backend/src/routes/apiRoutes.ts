import { Router } from "express";
import { authenticate } from "../middleware";
import { todosRouter } from "./todosRoutes";
import { usersRouter } from "./usersRoutes";

const router = Router();

router.use("/todos", authenticate, todosRouter);
router.use("/users", usersRouter);

export { router as apiRoutes };
