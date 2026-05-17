import { Button, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import type z from "zod";
import { SignInSchema } from "~/schemas/authSchemas";
import type { registerUserSchema } from "~/server/api/routers/user";
import { api } from "~/utils/api";
import classes from "./signInForm.module.css";

export type RegisterUserFormInputs = z.infer<typeof registerUserSchema>;

export function RegisterUserForm() {
  const utils = api.useUtils();
  const register = api.user.registerUser.useMutation({
    onSuccess: () => void utils.auth.getSession.invalidate(),
  });
  const form = useForm<RegisterUserFormInputs>({
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
