declare global {
  interface User {
    _id?: string;
    email: string;
    password?: string;
    fullName?: string;
  }

  interface TodoType {
    _id?: number;
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

  interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void | string>;
    signup: (
      email: string,
      password: string,
      fullname: string
    ) => Promise<void | string>;
    logout: () => void;
  }
}

export {};