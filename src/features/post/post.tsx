import {
  faComment,
  faEllipsis,
  faHeart,
  faPen,
  faRetweet,
  faShare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Divider, Group, Menu, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { IconButton } from "~/components/iconButton";
import { api, type RouterOutputs } from "~/utils/api";
import { formatCreatedAtDate } from "~/utils/helpers";
import { CreateCommentModal } from "../comment/createCommentModal";
import classes from "./post.module.css";

type Post = NonNullable<RouterOutputs["post"]["getAll"]>[number];

export function Post({ post, onClick }: { post: Post; onClick?: () => void }) {
  const [opened, { open, close }] = useDisclosure(false);

  const utils = api.useUtils();
  const { data: session } = api.auth.getSession.useQuery();
  if (!session) return null;

  const { data: author } = api.user.getUserById.useQuery({ id: post.userId });
  const hasRetweeted = post.retweets.some((r) => r.userId === session.id);
  const hasLiked = post.likes.some((r) => r.userId === session.id);

  const deletePost = api.post.delete.useMutation({
    onSuccess: () => void utils.post.getAll.invalidate(),
  });

  const retweetPost = api.retweet.toggle.useMutation({
    onMutate: async ({ postId }) => {
      await utils.post.getAll.cancel();

      const previous = utils.post.getAll.getData();

      utils.post.getAll.setData(undefined, (old) =>
        old?.map((p) =>
          p.id !== postId
            ? p
            : {
                ...p,
                retweetCount: hasRetweeted
                  ? p.retweetCount - 1
                  : p.retweetCount + 1,
                retweets: hasRetweeted
                  ? p.retweets.filter((r) => r.userId !== session.id)
                  : [...p.retweets, { userId: session.id }],
              },
        ),
      );

      return { previous };
    },
    onError: (_err, _input, context) => {
      utils.post.getAll.setData(undefined, context?.previous);
    },
    onSettled: () => {
      void utils.post.getAll.invalidate();
    },
  });

  const likePost = api.like.toggle.useMutation({
    onMutate: async ({ postId }) => {
      await utils.post.getAll.cancel();

      const previous = utils.post.getAll.getData();

      utils.post.getAll.setData(undefined, (old) =>
        old?.map((p) =>
          p.id !== postId
            ? p
            : {
                ...p,
                likeCount: hasLiked ? p.likeCount - 1 : p.likeCount + 1,
                likes: hasLiked
                  ? p.likes.filter((r) => r.userId !== session.id)
                  : [...p.likes, { userId: session.id }],
              },
        ),
      );

      return { previous };
    },
    onError: (_err, _input, context) => {
      utils.post.getAll.setData(undefined, context?.previous);
    },
    onSettled: () => {
      void utils.post.getAll.invalidate();
    },
  });

  function handleDeletePost() {
    deletePost.mutate({ postId: post.id });
  }
  function handleRetweetPost() {
    retweetPost.mutate({ postId: post.id });
  }
  function handleLikePost() {
    likePost.mutate({ postId: post.id });
  }

  if (!author) return null;
  return (
    <Stack
      onClick={onClick}
      className={classes.post}
      gap={0}
      data-clickable={!!onClick}
    >
      <Group justify="space-between" p="lg">
        <Group>
          <Avatar src={author.image}></Avatar>
          <Text>{author.name ? author.name : author.email}</Text>
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
            {post.userId === session.id && (
              <>
                <Menu.Divider />
                <Menu.Item
                  leftSection={<FontAwesomeIcon icon={faPen} size="sm" />}
                >
                  Edit post
                </Menu.Item>
                <Menu.Item
                  onClick={handleDeletePost}
                  leftSection={<FontAwesomeIcon icon={faTrashCan} size="sm" />}
                >
                  Delete post
                </Menu.Item>
              </>
            )}
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Group
        p="lg"
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
        <Group gap={0}>
          <IconButton onClick={open} icon={faComment} />
          <Text size="sm">{post.commentCount}</Text>
        </Group>
        <Group gap={0}>
          <IconButton
            icon={faRetweet}
            onClick={handleRetweetPost}
            style={{ color: hasRetweeted ? "seaGreen" : undefined }}
          />
          <Text
            size="sm"
            style={{ color: hasRetweeted ? "seaGreen" : undefined }}
          >
            {post.retweetCount}
          </Text>
        </Group>
        <Group gap={0}>
          <IconButton
            icon={faHeart}
            c={hasLiked ? "red" : undefined}
            onClick={handleLikePost}
          />
          <Text size="sm" c={hasLiked ? "red" : undefined}>
            {post.likeCount}
          </Text>
        </Group>
      </Group>
      <CreateCommentModal
        session={session}
        post={post}
        author={author}
        opened={opened}
        close={close}
      />
    </Stack>
  );
}
