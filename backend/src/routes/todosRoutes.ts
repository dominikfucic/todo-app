import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from "../controllers/todosControllers";

const router = Router();

router.post("/addTodo",  addTodo);
router.delete("/deleteTodo/:todoId", deleteTodo);
router.patch("/editTodo/:todoId", editTodo);
router.get("/", getTodos);

export { router as todosRouter };
