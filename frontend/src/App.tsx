import React from "react";
import TodoList from "./containers/TodoList";
import AddTodo from "./components/AddTodo";
import { TodoContext } from "./providers/TodoProvider";
import { Button, Container, Group, Title } from "@mantine/core";
import { AuthContext } from "./providers/AuthProvider";

function App() {
  const todoContext = React.useContext(TodoContext);
  const authContext = React.useContext(AuthContext);
  return (
    <>
      <Group position="apart" m="lg">
        <Title weight="normal" order={3}>
          <b>Hello</b> {authContext?.user?.fullName}
        </Title>
        <Button variant="outline" onClick={() => authContext?.logout()}>
          Logout
        </Button>
      </Group>

      {todoContext?.todos && todoContext?.todos.length > 0 ? (
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
