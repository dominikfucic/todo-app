import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import {
  Group,
  PasswordInput,
  Container,
  Button,
  Title,
  TextInput,
  Flex,
  Alert,
} from "@mantine/core";
import { IconAt, IconAlertCircle } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    auth
      ?.signup(email, password, fullName)
      .then(() => navigate("/"))
      .catch(console.error);
  };

  if (auth?.user) return <Navigate to="/" replace />;

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSubmit(values.email, values.password, values.fullName)
      )}
    >
      {auth?.error && (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Error occured!"
          color="red"
        >
          {auth.error}
        </Alert>
      )}
      <Container my="xl">
        <Title order={1} mb="xl">
          Register
        </Title>

        <Flex direction="column" gap="sm">
          <TextInput
            placeholder="your name"
            label="Full name"
            {...form.getInputProps("fullName")}
          />
          <TextInput
            label="Email"
            placeholder="user@mail.com"
            icon={<IconAt size="0.8rem" />}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            id="your-password"
            {...form.getInputProps("password")}
          />
          <PasswordInput label="Repeat password" id="repeat-password" mb="sm" />
        </Flex>
        <Group position="left">
          <Button onClick={() => navigate("/login")}>Log In</Button>
          <Button type="submit">Register</Button>
        </Group>
      </Container>
    </form>
  );
}
