import { faClose, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  FileButton,
  Group,
  Stack,
  Textarea,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import Image from "next/image";
import { useState } from "react";
import z from "zod";
import { api } from "~/utils/api";
import { useUploadThing } from "~/utils/uploadthing";
import type { Post } from "../../../generated/prisma";
import classes from "./createPostForm.module.css";

const CreatePostFormSchema: z.ZodType<Pick<Post, "content" | "image">> =
  z.object({
    content: z.string().min(2),
    image: z.string().nullable(),
  });

type CreatePostFormInputs = z.infer<typeof CreatePostFormSchema>;

export function CreatePostForm() {
  const { data: user } = api.auth.getSession.useQuery();

  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      form.reset();
      setFile(null);
      setPreview(null);
      void utils.post.getAll.invalidate();
    },
  });
  const form = useForm<CreatePostFormInputs>({
    mode: "uncontrolled",
    validate: schemaResolver(CreatePostFormSchema, { sync: true }),
    initialValues: {
      content: "",
      image: null,
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { startUpload } = useUploadThing("imageUploader");

  function handleFileUpload(file: File | null) {
    setFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSubmit(values: CreatePostFormInputs) {
    if (!user) return;
    let imageUrl: string | null = null;
    if (file) {
      const res = await startUpload([file]);
      imageUrl = res?.[0]?.ufsUrl ?? null;
    }
    createPost.mutate({
      content: values.content,
      userId: user.id,
      image: imageUrl,
    });
  }

  if (!user) return null;

  return (
    <form
      className={classes.formContainer}
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Group align="flex-start">
        <Avatar
          bd={"1px solid gray"}
          src={user.image}
          alt={`${user.name}'s profile picture`}
        />
        <Stack gap={16} flex={1}>
          <Textarea
            key={form.key("content")}
            size="md"
            placeholder="What's on your mind?"
            {...form.getInputProps("content")}
          />
          {preview && file && (
            <Group w={"fit-content"} pos={"relative"}>
              <Button
                onClick={() => setPreview(null)}
                className={classes.removePreviewButton}
                variant="iconTransparent"
              >
                <FontAwesomeIcon icon={faClose} />
              </Button>
              <Image
                style={{ objectFit: "cover" }}
                src={preview}
                height={400}
                width={400}
                alt={`Preview of uploaded image ${file.name}`}
              />
            </Group>
          )}
          <Group justify="space-between">
            <FileButton
              onChange={handleFileUpload}
              accept="image/png,image/jpg,image/jpeg"
            >
              {(props) => (
                <Button variant="icon" {...props}>
                  <FontAwesomeIcon icon={faImage} size="lg" />
                </Button>
              )}
            </FileButton>
            <Button w={"fit-content"} type="submit">
              Create
            </Button>
          </Group>
        </Stack>
      </Group>
    </form>
  );
}
