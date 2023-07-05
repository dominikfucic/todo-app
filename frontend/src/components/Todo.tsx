import React from "react";
import { IconTrash, IconEdit, IconCheck } from "@tabler/icons-react";
import { Input, ActionIcon, Group, Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TodoContext } from "../providers/TodoProvider";

export default function Todo({ todo }: { todo: TodoType }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const todoContext = React.useContext(TodoContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = React.useState(todo.title);

  let selected: TodoType | null = null;
  let setSelected: React.Dispatch<React.SetStateAction<TodoType | null>>;

  if (todoContext) {
    selected = todoContext.selected;
    setSelected = todoContext.setSelected;
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSelection() {
    if (selected) {
      setSelected(null);
      return;
    }
    setSelected(todo);
  }

  function handleCompletion() {
    if (todo._id) {
      todoContext?.completeTodo(todo._id);
      setSelected(null);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit todo">
        <Input
          ref={inputRef}
          value={value}
          onChange={onChangeHandler}
          onFocus={() => inputRef.current?.select()}
        />

        <Group mt="md">
          <Button
            onClick={() => {
              todo._id && todoContext?.editTodo(todo._id, value);
              close();
              setSelected(null);
            }}
          >
            Save
          </Button>
          <Button color="gray.7" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Input
        sx={todo.completed ? { textDecoration: "line-through" } : {}}
        size="md"
        icon={
          todoContext?.selected?._id === todo._id &&
          !todo.completed && (
            <ActionIcon
              variant="transparent"
              style={{ pointerEvents: "auto" }}
              onClick={handleCompletion}
            >
              <IconCheck size="1.5rem" />
            </ActionIcon>
          )
        }
        rightSection={
          todoContext?.selected?._id === todo._id && (
            <Group spacing={5}>
              {!todo.completed && (
                <ActionIcon variant="transparent" onClick={open}>
                  <IconEdit size="1.5rem" />
                </ActionIcon>
              )}
              <ActionIcon
                variant="transparent"
                onClick={() =>
                  todo._id ? todoContext?.removeTodo(todo._id) : null
                }
              >
                <IconTrash size="1.5rem" />
              </ActionIcon>
            </Group>
          )
        }
        rightSectionWidth={todo.completed ? 0 : 80}
        value={value}
        onChange={onChangeHandler}
        onKeyDown={(e) => e.code === "Enter" && setSelected(null)}
        onClick={handleSelection}
        readOnly={true}
      />
    </>
  );
}
