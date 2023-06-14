import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import {
  Anchor,
  Group,
  Text,
  PasswordInput,
  Container,
  Button,
  Title,
  TextInput,
  Flex,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth?.user) return <Navigate to="/" replace />;

  return (
    <Container my="xl">
      <Title order={1} mb="xl">
        Register
      </Title>

      <Flex direction="column" gap="sm">
        <TextInput placeholder="your name" label="Full name" />
        <TextInput
          label="Email"
          placeholder="user@mail.com"
          icon={<IconAt size="0.8rem" />}
        />
        <PasswordInput label="Password" id="your-password" />
        <PasswordInput label="Repeat password" id="repeat-password" mb="sm" />
      </Flex>
      <Group position="left">
        <Button onClick={() => navigate("/login")}>Log In</Button>
        <Button onClick={() => navigate("/")}>Register</Button>
      </Group>
    </Container>
  );
}
