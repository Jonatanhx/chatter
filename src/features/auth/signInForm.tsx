import { Button, Divider, Text, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { SignInSchema, type SignInFormInputs } from "~/schemas/authSchemas";
import { api } from "~/utils/api";
import classes from "./signInForm.module.css";

export function SignInForm() {
  const utils = api.useUtils();
  const signIn = api.auth.signIn.useMutation({
    onSuccess: () => void utils.auth.getSession.invalidate(),
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
        Sign in
      </Button>
      <Divider />
      <Text size="sm" c="var(--mantine-color-dark-1)">
        Not part of the conversation yet?
      </Text>
      <Button>Register</Button>
    </form>
  );
}
