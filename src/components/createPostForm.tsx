import { Button, Textarea } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import z from "zod";
import { api } from "~/utils/api";
import type { User } from "../../generated/prisma";
import classes from "./form.module.css";
const CreatePostFormSchema = z.object({
  content: z.string().min(2),
});
type CreatePostFormInputs = z.infer<typeof CreatePostFormSchema>;

export function CreatePostForm({ user }: { user: User }) {
  const createPost = api.post.create.useMutation();
  const form = useForm<CreatePostFormInputs>({
    mode: "uncontrolled",
    validate: schemaResolver(CreatePostFormSchema, { sync: true }),
  });

  if (!user) return;
  return (
    <form
      className={classes.formContainer}
      onSubmit={form.onSubmit((values) =>
        createPost.mutate({ content: values.content, userId: user.id }),
      )}
    >
      <Textarea
        label="Type content here"
        placeholder="What's on your mind?"
        {...form.getInputProps("content")}
      />
      <Button type="submit">Create</Button>
    </form>
  );
}
