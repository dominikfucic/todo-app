import axios, { AxiosError } from "axios";
import React from "react";

export interface TodoType {
  id?: number;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: TodoType[];
  removeTodo: (id: number) => void;
  editTodo: (id: number | undefined, value: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  selected: TodoType | null;
  setSelected: React.Dispatch<React.SetStateAction<TodoType | null>>;
  addTodo: (todo: TodoType) => void;
  error: string | null;
}

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
    // axios
    //   .get("/api/todos")
    //   .then((res) => console.log(res.data))
    //   .catch((error: AxiosError) => {
    //     if (error.code === AxiosError.ERR_NETWORK) {
    //       setError(error.message);
    //     } else {
    //       setError("Something went wrong.");
    //     }
    //   });
  });

  function removeTodo(id: number) {
    setTodos((prevState) => {
      return prevState.filter((todo) => todo.id !== id);
    });
  }

  function editTodo(id: number | undefined, value: string) {
    setTodos((prevState) => {
      return prevState.map((todo) => {
        if (todo.id === id) {
          todo.title = value;
        }
        return todo;
      });
    });
  }

  function addTodo(todo: TodoType) {
    if (todo.title.length > 0) {
      const previousTodoId = todos.length > 0 ? todos[todos.length - 1].id : 0;
      const newTodo: TodoType = {
        ...todo,
        id: previousTodoId ? previousTodoId + 1 : 1,
      };
      setTodos([...todos, newTodo]);
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
