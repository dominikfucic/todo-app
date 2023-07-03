import React from "react";
import TodoList from "./containers/TodoList";
import AddTodo from "./components/AddTodo";
import { TodoContext } from "./providers/TodoProvider";

function App() {
  const todoContext = React.useContext(TodoContext);
  return (
    <>
      {todoContext?.todos ? <TodoList /> : <p>Please add todo</p>}
      <AddTodo />
    </>
  );
}

export default App;
