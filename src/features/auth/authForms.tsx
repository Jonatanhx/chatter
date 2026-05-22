import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Stack, Text, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import {
  SignInSchema,
  type RegisterFormInputs,
  type SignInFormInputs,
} from "~/schemas/authSchemas";
import { api } from "~/utils/api";
import classes from "./authForms.module.css";

export function SignInForm() {
  const utils = api.useUtils();
  const signIn = api.auth.signIn.useMutation({
    onSuccess: () => void utils.auth.getSession.invalidate(),
    onError: () => form.setErrors({ root: "Invalid Credentials" }),
  });
  const form = useForm<SignInFormInputs>({
    mode: "uncontrolled",
    validate: schemaResolver(SignInSchema, { sync: true }),
  });
  return (
    <form
      className={classes.formContainer}
      onSubmit={form.onSubmit((values) => signIn.mutate(values))}
    >
      <Stack
        px="lg"
        py="md"
        style={{ borderBottom: "1px solid var(--mantine-color-neutral-8)" }}
      >
        <Text size="lg" c="neutral.2" fw={600}>
          Enter your credentials.
        </Text>
      </Stack>
      <Stack flex={1} p="lg" justify="space-between">
        <Stack gap="lg">
          <TextInput
            leftSection={<FontAwesomeIcon icon={faEnvelope} size="sm" />}
            size="lg"
            placeholder="example@email.com"
            {...form.getInputProps("email")}
          />
          <TextInput
            leftSection={<FontAwesomeIcon icon={faEnvelope} size="sm" />}
            size="lg"
            type="password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          {form.errors.root && (
            <Text c="red" size="sm">
              {form.errors.root}
            </Text>
          )}
        </Stack>
        <Button size="lg" type="submit" color="brand.4">
          Sign in
        </Button>
      </Stack>
    </form>
  );
}

export function RegisterForm() {
  const utils = api.useUtils();
  const register = api.user.registerUser.useMutation({
    onSuccess: () => void utils.auth.getSession.invalidate(),
  });
  const form = useForm<RegisterFormInputs>({
    mode: "uncontrolled",
    validate: schemaResolver(SignInSchema, { sync: true }),
  });
  return (
    <form
      className={classes.formContainer}
      onSubmit={form.onSubmit((values) => register.mutate(values))}
    >
      <Stack
        px="lg"
        py="md"
        style={{ borderBottom: "1px solid var(--mantine-color-neutral-8)" }}
      >
        <Text size="lg" c="neutral.2" fw={600}>
          Create a new account
        </Text>
      </Stack>
      <Stack flex={1} p="lg" justify="space-between">
        <Stack gap="lg">
          <TextInput
            leftSection={<FontAwesomeIcon icon={faUser} size="sm" />}
            size="lg"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            leftSection={<FontAwesomeIcon icon={faEnvelope} size="sm" />}
            size="lg"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            leftSection={<FontAwesomeIcon icon={faLock} size="sm" />}
            size="lg"
            type="password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
        </Stack>
        <Button size="lg" type="submit" color="brand.4">
          Register
        </Button>
      </Stack>
    </form>
  );
}
