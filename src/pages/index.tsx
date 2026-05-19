import { Stack } from "@mantine/core";
import { CreatePostForm } from "~/features/post/createPostForm";
import { PostFeed } from "~/features/post/postFeed";

export default function HomePage() {
  return (
    <Stack gap={0} w={"100%"} style={{ placeSelf: "center" }}>
      <CreatePostForm />
      <PostFeed />
    </Stack>
  );
}
