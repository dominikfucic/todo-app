declare global {
  interface User {
    _id?: string;
    email: string;
    password?: string;
    fullName?: string;
  }

  interface TodoType {
    _id?: string;
    title: string;
    completed: boolean;
  }

  interface TodoContextType {
    todos: TodoType[];
    removeTodo: (id: string) => void;
    editTodo: (id: string, value: string) => void;
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
    selected: TodoType | null;
    setSelected: React.Dispatch<React.SetStateAction<TodoType | null>>;
    addTodo: (todo: TodoType) => void;
    error: string | null;
    getTodos: () => Promise<void>;
    completeTodo: (id: string) => Promise<void>;
  }

  interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (
      email: string,
      password: string,
      fullname: string
    ) => Promise<void>;
    logout: () => void;
    setError: React.Dispatch<React.SetStateAction<string>>;
    error: string;
  }
}

export {};
