import { Button, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { SignInSchema, type SignInFormInputs } from "~/schemas/authSchemas";
import { api } from "~/utils/api";
import classes from "./form.module.css";

export function SignInForm() {
  const utils = api.useUtils();
  const signIn = api.user.verifyCredentials.useMutation({
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
        withAsterisk
        label="Email"
        placeholder="example@email.com"
        {...form.getInputProps("email")}
      />
      <TextInput
        withAsterisk
        type="password"
        label="Password"
        placeholder="**********"
        {...form.getInputProps("password")}
      />
      <Button type="submit">Sign in</Button>
    </form>
  );
}
