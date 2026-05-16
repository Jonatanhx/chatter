import { Stack } from "@mantine/core";
import { CreatePostForm } from "~/features/post/createPostForm";
import { PostFeed } from "~/features/post/postFeed";

export default function Home() {
  return (
    <Stack pt={20} w={500} style={{ placeSelf: "center" }}>
      <CreatePostForm />
      <PostFeed />
    </Stack>
  );
}
