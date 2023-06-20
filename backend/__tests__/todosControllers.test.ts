import { NextFunction, Request, Response } from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from "../src/controllers/todosControllers";
import mongoose from "mongoose";
import { Todo } from "../src/models/Todo";

describe("/todos", () => {
  let req: Request, res: Response, next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
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
        id: "mockedId",
      },
    } as any as Request;

    Todo.findByIdAndDelete = jest.fn();

    await deleteTodo(req, res, next);

    expect(Todo.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
  });

  it("should update todo", async () => {
    req = {
      body: {
        title: "updated todo",
      },
      params: {
        id: "mockedId",
      },
    } as any as Request;

    Todo.findByIdAndUpdate = jest.fn();

    await editTodo(req, res, next);

    expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, {
      title: req.body.title,
    });
    expect(res.status).toHaveBeenCalledWith(200);
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
