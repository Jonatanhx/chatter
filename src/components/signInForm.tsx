import { TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import z from "zod";
import classes from "./form.module.css";

const SignInFormSchema = z.object({
  email: z.string().min(2),
  password: z.string(),
});

type SignInFormInputs = z.infer<typeof SignInFormSchema>;

export function SignInForm() {
  const form = useForm<SignInFormInputs>({
    mode: "uncontrolled",
    validate: schemaResolver(SignInFormSchema, { sync: true }),
  });

  return (
    <form
      className={classes.formContainer}
      onSubmit={form.onSubmit((values) => console.log(values))}
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
      <button>Create</button>
    </form>
  );
}
