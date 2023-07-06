import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Anchor,
  Group,
  Text,
  PasswordInput,
  Container,
  Button,
  Title,
  TextInput,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (email: string, password: string) => {
    auth
      ?.login(email, password)
      .then(() => navigate("/"))
      .catch((err: Error) => auth?.setError(err.message));
  };

  if (auth?.user) return <Navigate to="/" replace />;

  return (
    <Container my="xl">
      {auth?.error && (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Error occured!"
          color="red"
        >
          {auth?.error}
        </Alert>
      )}
      <Title order={1} mb="xl">
        Log in
      </Title>

      <form
        onSubmit={form.onSubmit((values) =>
          onSubmit(values.email, values.password)
        )}
      >
        <TextInput
          placeholder="Email"
          label="Your email"
          mb="sm"
          {...form.getInputProps("email")}
        />

        <Group position="apart" mb={5}>
          <Text
            component="label"
            htmlFor="your-password"
            size="sm"
            weight={500}
          >
            Password
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
        <PasswordInput
          placeholder="Your password"
          id="your-password"
          mb="sm"
          {...form.getInputProps("password")}
        />
        <Group position="left">
          <Button type="submit">Log in</Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
        </Group>
      </form>
    </Container>
  );
}
