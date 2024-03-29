import { NextFunction, Request, Response } from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from "../controllers/todosControllers";
import mongoose from "mongoose";
import { Todo } from "../models/Todo";

describe("/todos", () => {
  let req: Request, res: Response, next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any as Response;
    next = jest.fn() as NextFunction;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new todo", async () => {
    req = {
      body: {
        title: "test",
      },
      userId: "mockedId",
    } as any as Request;

    const todo = {
      _id: "mockedId",
      title: req.body.title,
      completed: false,
      userId: req.userId,
    };

    Todo.create = jest.fn().mockResolvedValue(todo);

    await addTodo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(todo);
    expect(next).not.toHaveBeenCalled();
  });

  it("should delete todo", async () => {
    req = {
      params: {
        todoId: "mockedId",
      },
    } as any as Request;

    Todo.findByIdAndDelete = jest.fn();

    await deleteTodo(req, res, next);

    expect(Todo.findByIdAndDelete).toHaveBeenCalledWith(req.params.todoId);
    expect(res.sendStatus).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
  });

  it("should update todo", async () => {
    req = {
      body: {
        comepleted: true,
      },
      params: {
        todoId: "mockedId",
      },
    } as any as Request;

    Todo.findByIdAndUpdate = jest.fn();

    await editTodo(req, res, next);

    expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(req.params.todoId, {
      completed: req.body.completed,
    });
    expect(res.sendStatus).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
  });

  it("should get todos", async () => {
    req = {
      userId: "mockedId",
    } as any as Request;

    const todos = [
      {
        _id: "mockedId",
        title: "todo 1",
        completed: false,
        userId: req.userId,
      },
    ];

    Todo.find = jest.fn().mockResolvedValue(todos);

    await getTodos(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ todos });
    expect(next).not.toHaveBeenCalled();
  });
});
