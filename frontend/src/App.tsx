import {
  Container,
  Title,
  Divider,
  Stack,
  Input,
  Grid,
  Button,
} from "@mantine/core";
import Todo from "./components/Todo";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { TodoContext } from "./components/TodoProvider";
import { TodoType } from "./components/TodoProvider";

function App() {
  const todoContext = React.useContext(TodoContext);
  const todos = todoContext?.todos ?? [];

  const [todo, setTodo] = React.useState<TodoType>({
    title: "",
    completed: false,
  });

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo({ ...todo, title: e.target.value });
  }

  return (
    <>
    {todos.length > 0 ? <Container w={{ base: "100%", xs: "60%", sm: "50%" }} mx="auto" my="lg">
      <Title>Tasks</Title>
      <Divider my="xl" />
      <Stack>
        {todos.map(
          (todo) => !todo.completed && <Todo key={todo.id} todo={todo} />
        )}
      </Stack>
      <Title mt="lg">Completed</Title>
      <Divider my="xl" />
      {todos.map(
        (todo) => todo.completed && <Todo key={todo.id} todo={todo} />
      )}
      <Grid
        columns={12}
        pos="fixed"
        bottom="0"
        left="0"
        right="0"
        m="1rem"
        w={{ base: "100%", xs: "60%", sm: "50%" }}
        mx="auto"
        px="xs"
      >
        <Grid.Col span={9}>
          <Input
            size="md"
            placeholder="Add new task..."
            icon={<IconPlus size="1rem" />}
            onChange={onChangeHandler}
            value={todo.title}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            size="md"
            w="100%"
            onClick={() => {
              todoContext?.addTodo(todo);
              setTodo({ title: "", completed: false });
            }}
          >
            Add
          </Button>
        </Grid.Col>
      </Grid>
    </Container> : <h1>{todoContext?.error}</h1>}
    </>
  );
}

export default App;
