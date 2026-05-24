import {
  Avatar,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import Image from "next/image";
import z from "zod";
import { api } from "~/utils/api";
import type { Comment, Post, User } from "../../../generated/prisma";

type CreateCommentModalProps = {
  session: User;
  post: Post;
  author: User;
  opened: boolean;
  close: () => void;
};
const createCommentFormInputsSchema: z.ZodType<
  Pick<Comment, "content" | "image">
> = z.object({
  content: z.string().min(2),
  image: z.string().nullable(),
});

type CreateCommentFormInputs = z.infer<typeof createCommentFormInputsSchema>;

export function CreateCommentModal({
  session,
  post,
  author,
  opened,
  close,
}: CreateCommentModalProps) {
  const utils = api.useUtils();
  const createComment = api.comment.create.useMutation({
    onSuccess: void utils.comment.getAll.invalidate(),
  });
  const form = useForm<CreateCommentFormInputs>({
    mode: "uncontrolled",
    validate: schemaResolver(createCommentFormInputsSchema, { sync: true }),
    initialValues: {
      content: "",
      image: null,
    },
  });

  function handleSubmit(values: CreateCommentFormInputs) {
    createComment.mutate({
      content: values.content,
      image: null,
      userId: session.id,
      postId: post.id,
    });
  }

  return (
    <Modal
      size="lg"
      onClick={(e) => e.stopPropagation()}
      opened={opened}
      onClose={close}
      title="Comment"
    >
      <Group wrap="nowrap" align="flex-start" p="lg">
        <Avatar src={author.image} />
        <Stack gap={6}>
          <Text c="neutral.1" fw={600}>
            {author.name ? author.name : author.email}
          </Text>
          <Text>{post.content}</Text>
          {post.image && (
            <Image
              src={post.image}
              alt={post.content}
              height={200}
              width={200}
            />
          )}
        </Stack>
      </Group>
      <Group
        p="lg"
        align="flex-start"
        style={{ borderTop: "1px solid var(--mantine-color-neutral-8)" }}
      >
        <Avatar src={session.image} />
        <Stack flex={1} align="flex-end">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Textarea
              {...form.getInputProps("content")}
              placeholder="Write your reply"
              size="md"
              w="100%"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Stack>
      </Group>
    </Modal>
  );
}
