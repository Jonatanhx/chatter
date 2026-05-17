import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Group, Text, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { useState, type Dispatch, type SetStateAction } from "react";
import {
  SignInSchema,
  type RegisterFormInputs,
  type SignInFormInputs,
} from "~/schemas/authSchemas";
import { api } from "~/utils/api";
import classes from "./authForms.module.css";

export default function AuthForms() {
  const [activeForm, setActiveForm] = useState<"SIGNIN" | "REGISTER">("SIGNIN");
  return (
    <>
      {activeForm === "SIGNIN" && <SignInForm setActiveForm={setActiveForm} />}
      {activeForm === "REGISTER" && (
        <RegisterForm setActiveForm={setActiveForm} />
      )}
    </>
  );
}
function SignInForm({
  setActiveForm,
}: {
  setActiveForm: Dispatch<SetStateAction<"SIGNIN" | "REGISTER">>;
}) {
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
      <Button onClick={() => setActiveForm("REGISTER")}>Register</Button>
    </form>
  );
}

function RegisterForm({
  setActiveForm,
}: {
  setActiveForm: Dispatch<SetStateAction<"SIGNIN" | "REGISTER">>;
}) {
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
      <Group gap={0}>
        <Button
          variant="icon"
          onClick={() => setActiveForm("SIGNIN")}
          leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
        />
        <Text size="lg" fw={"500"}>
          Register
        </Text>
      </Group>
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
