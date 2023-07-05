import React from "react";
import TodoList from "./containers/TodoList";
import AddTodo from "./components/AddTodo";
import { TodoContext } from "./providers/TodoProvider";
import { Container, Title } from "@mantine/core";

function App() {
  const todoContext = React.useContext(TodoContext);
  return (
    <>
      {todoContext?.todos.length !== 0 ? (
        <TodoList />
      ) : (
        <Container w={{ base: "100%", xs: "60%", sm: "50%" }} mx="auto" my="lg">
          <Title align="center" weight="normal">
            Please add todo
          </Title>
        </Container>
      )}
      <AddTodo />
    </>
  );
}

export default App;
