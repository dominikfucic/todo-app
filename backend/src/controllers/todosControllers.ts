import { Todo } from "../models/Todo";

export const addTodo: Handler = async (req, res, next) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      completed: false,
      userId: req.userId,
    });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};
export const deleteTodo: Handler = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.todoId);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
export const editTodo: Handler = async (req, res, next) => {
  try {
    await Todo.findByIdAndUpdate(req.params.todoId, {
      title: req.body.title,
      completed: req.body.completed,
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
export const getTodos: Handler = async (req, res, next) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.status(200).json({ todos });
  } catch (error) {
    next(error);
  }
};
