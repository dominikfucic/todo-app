import React from "react";
import { Container, Title, Divider, Stack } from "@mantine/core";
import Todo from "../components/Todo";
import { TodoContext } from "../providers/TodoProvider";

export default function TodoList() {
  const todoContext = React.useContext(TodoContext);
  const todos = todoContext?.todos;

  React.useEffect(() => {
    todoContext?.getTodos();
  }, []);

  return (
    <Container w={{ base: "100%", xs: "60%", sm: "50%" }} mx="auto" my="lg">
      <Title>Tasks</Title>
      <Divider my="xl" />
      <Stack>
        {todos?.map(
          (todo) =>
            todo.completed === false && <Todo key={todo._id} todo={todo} />
        )}
      </Stack>
      <Title mt="lg">Completed</Title>
      <Divider my="xl" />
      {todos?.map(
        (todo) => todo.completed && <Todo key={todo._id} todo={todo} />
      )}
    </Container>
  );
}
