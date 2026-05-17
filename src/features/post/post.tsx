import {
  faComment,
  faEllipsis,
  faHeart,
  faRetweet,
  faShare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Divider,
  Group,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import { api, type RouterOutputs } from "~/utils/api";
import classes from "./post.module.css";

type Post = NonNullable<RouterOutputs["post"]["getLatest"]>;

export function Post({ post }: { post: Post }) {
  const utils = api.useUtils();

  const { data: session } = api.auth.getSession.useQuery();
  if (!session) return null;
  const { data: user } = api.user.getUserById.useQuery({ id: post.userId });
  const deletePost = api.post.delete.useMutation({
    onSuccess: () => void utils.post.getAll.invalidate(),
  });

  function handleDeletePost() {
    deletePost.mutate({ postId: post.id });
  }

  function formatCreatedAtDate(createdAt: Date): string {
    const seconds = Math.floor(
      (new Date().getTime() - createdAt.getTime()) / 1000,
    );

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
  if (!user) return null;
  return (
    <Stack className={classes.post} gap={0}>
      <Group justify="space-between" p={20}>
        <Group>
          <Avatar src={user.image}></Avatar>
          <Text>{user.name ? user.name : user.email}</Text>
          <Text>{formatCreatedAtDate(post.createdAt)}</Text>
        </Group>
        <Menu>
          <Menu.Target>
            <Button variant="icon">
              <FontAwesomeIcon icon={faEllipsis} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<FontAwesomeIcon icon={faShare} size="sm" />}
            >
              Share post
            </Menu.Item>
            {post.userId === session.id && <Menu.Divider />}
            {post.userId === session.id && (
              <Menu.Item
                onClick={handleDeletePost}
                leftSection={<FontAwesomeIcon icon={faTrashCan} size="sm" />}
              >
                Delete post
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Group
        p={20}
        align="start"
        styles={{ root: { flexDirection: "column" } }}
      >
        <Text>{post.content}</Text>
        {post.image && (
          <Image src={post.image} alt={post.content} height={200} width={200} />
        )}
      </Group>
      <Divider />
      <Group p={10}>
        <Button variant="icon">
          <FontAwesomeIcon icon={faComment} />
        </Button>
        <Button variant="icon">
          <FontAwesomeIcon icon={faRetweet} />
        </Button>
        <Button variant="icon">
          <FontAwesomeIcon icon={faHeart} />
        </Button>
      </Group>
    </Stack>
  );
}
