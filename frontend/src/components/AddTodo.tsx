import React from "react";
import { Button, Grid, Input } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { TodoContext } from "../providers/TodoProvider";

export default function AddTodo() {
  const todoContext = React.useContext(TodoContext);
  const [todo, setTodo] = React.useState<TodoType>({
    title: "",
    completed: false,
  });

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo({ ...todo, title: e.target.value });
  }
  return (
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
  );
}
