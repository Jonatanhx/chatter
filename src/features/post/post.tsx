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
  Modal,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { IconButton } from "~/components/iconButton";
import { api, type RouterOutputs } from "~/utils/api";
import { formatCreatedAtDate } from "~/utils/helpers";
import classes from "./post.module.css";

type Post = NonNullable<RouterOutputs["post"]["getLatest"]>;

export function Post({ post, onClick }: { post: Post; onClick?: () => void }) {
  const [opened, { open, close }] = useDisclosure(false);
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

  if (!user) return null;
  return (
    <Stack
      onClick={onClick}
      className={classes.post}
      gap={0}
      data-clickable={!!onClick}
    >
      <Group justify="space-between" p={20}>
        <Group>
          <Avatar src={user.image}></Avatar>
          <Text>{user.name ? user.name : user.email}</Text>
          <Text>{formatCreatedAtDate(post.createdAt)}</Text>
        </Group>
        <Menu>
          <Menu.Target>
            <IconButton icon={faEllipsis} />
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
        <IconButton onClick={open} icon={faComment} />
        <IconButton icon={faRetweet} />
        <IconButton icon={faHeart} />
      </Group>
      <Modal
        size="lg"
        onClick={(e) => e.stopPropagation()}
        opened={opened}
        onClose={close}
        title="Comment"
      >
        <Group wrap="nowrap" align="flex-start" p="lg">
          <Avatar src={user.image}></Avatar>
          <Stack gap={0}>
            <Text c="neutral.1" fw={600}>
              {user.name ? user.name : user.email}
            </Text>
            <Text>{post.content}</Text>
          </Stack>
        </Group>
        <Stack
          flex={1}
          p="lg"
          align="flex-end"
          style={{ borderTop: "1px solid var(--mantine-color-neutral-8)" }}
        >
          <Textarea w="100%" />
          <Button>Submit</Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
