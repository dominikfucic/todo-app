import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
} from "@mantine/core";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth?.user) return <Navigate to="/" replace />;

  return (
    <Container my="xl">
      <Title order={1} mb="xl">
        Log in
      </Title>

      <TextInput placeholder="Your name" label="Full name" mb="sm" />

      <Group position="apart" mb={5}>
        <Text component="label" htmlFor="your-password" size="sm" weight={500}>
          Your password
        </Text>

        <Anchor<"a">
          href="#"
          onClick={(event) => event.preventDefault()}
          sx={(theme) => ({
            paddingTop: 2,
            color:
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ],
            fontWeight: 500,
            fontSize: theme.fontSizes.xs,
          })}
        >
          Forgot your password?
        </Anchor>
      </Group>
      <PasswordInput placeholder="Your password" id="your-password" mb="sm" />
      <Group position="left">
        <Button onClick={() => navigate("/")}>Log in</Button>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </Group>
    </Container>
  );
}
