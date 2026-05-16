import { Avatar, Stack, Text } from "@mantine/core";
import Image from "next/image";
import { api, type RouterOutputs } from "~/utils/api";
import classes from "./post.module.css";

type Post = NonNullable<RouterOutputs["post"]["getLatest"]>;

export function Post({ post }: { post: Post }) {
  const { data: user } = api.user.getUserById.useQuery({ id: post.userId });
  if (!user) return null;
  return (
    <Stack className={classes.postCard}>
      <Avatar src={user.image}></Avatar>
      <Text>{post.content}</Text>
      {post.image && (
        <Image src={post.image} alt={post.content} height={200} width={200} />
      )}
    </Stack>
  );
}
