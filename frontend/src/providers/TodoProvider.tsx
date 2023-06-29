import axios, { AxiosError } from "axios";
import React from "react";
import { api } from "../axios";

export const TodoContext = React.createContext<TodoContextType | null>(null);

export default function TodoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = React.useState<TodoType[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<TodoType | null>(null);

  React.useEffect(() => {
    api
      .get("/todos")
      .then((res) => setTodos(res.data.todos))
      .catch((error: AxiosError) => {
        if (error.code === AxiosError.ERR_NETWORK) {
          setError(error.message);
        } else {
          setError("Something went wrong.");
        }
      });
  }, []);

  function removeTodo(id: number) {
    setTodos((prevState) => {
      return prevState.filter((todo) => todo._id !== id);
    });
  }

  function editTodo(id: number | undefined, value: string) {
    setTodos((prevState) => {
      return prevState.map((todo) => {
        if (todo._id === id) {
          todo.title = value;
        }
        return todo;
      });
    });
  }

  function addTodo(todo: TodoType) {
    if (todo.title.length > 0) {
      setTodos([...todos, todo]);
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
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
