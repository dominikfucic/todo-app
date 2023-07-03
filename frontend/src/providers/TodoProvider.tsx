import { AxiosError } from "axios";
import React from "react";
import api from "../axios";
import { AuthContext } from "./AuthProvider";

export const TodoContext = React.createContext<TodoContextType | null>(null);

export default function TodoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = React.useState<TodoType[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<TodoType | null>(null);
  const authContext = React.useContext(AuthContext);

  async function removeTodo(id: string) {
    try {
      await api.delete(`/todos/deleteTodo/${id}`);
      const newTodos = todos.filter((todo) => todo._id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.error("Failed to delete todo.", error);
    }
  }

  function editTodo(id: string, value: string) {
    setTodos((prevState) => {
      return prevState.map((todo) => {
        if (todo._id === id) {
          todo.title = value;
        }
        return todo;
      });
    });
  }

  async function addTodo(todo: TodoType) {
    if (todo.title.length > 0) {
      try {
        const res = await api.post("/todos/addTodo", todo);
        setTodos([...todos, res.data]);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function getTodos() {
    try {
      const todos = await api.get("/todos");
      setTodos(todos.data.todos);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          authContext?.logout();
          return;
        }
      }
      setError("Couldn't get todos.");
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        removeTodo,
        editTodo,
        setTodos,
        selected,
        setSelected,
        addTodo,
        error,
        getTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
