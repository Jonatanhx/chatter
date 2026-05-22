import { Button, Divider, Stack, Text, TextInput } from "@mantine/core";
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
      <Text size="lg" fw={"500"}>
        Sign in
      </Text>
      <Stack gap={4}>
        <Text size="sm" c="neutral.3">
          Account
        </Text>
        <TextInput
          placeholder="example@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
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
      <Button type="submit" className={classes.signInButton}>
        Sign in
      </Button>
      <Divider />
      <Text size="sm" c="var(--mantine-color-dark-1)">
        Not part of the conversation yet?
      </Text>
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
      <TextInput
        label="Name"
        placeholder="John Doe"
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Email"
        placeholder="example@email.com"
        {...form.getInputProps("email")}
      />
      <TextInput
        type="password"
        label="Password"
        placeholder="**********"
        {...form.getInputProps("password")}
      />
      <Button type="submit" className={classes.signInButton}>
        Register
      </Button>
    </form>
  );
}
