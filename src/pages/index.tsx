import { CreatePostForm } from "~/components/createPostForm";
import { Post } from "~/features/post/post";
import { PostFeed } from "~/features/post/postFeed";
import { api } from "~/utils/api";

export default function Home() {
  const user = api.user.getUserByEmail.useQuery({ email: "admin@admin.com" });
  const post = api.post.getLatest.useQuery();

  return (
    <PostFeed>
      {user.data && <CreatePostForm user={user.data} />}
      {post.data ? (
        <Post post={post.data} />
      ) : (
        "This post has been removed or is unavailable"
      )}
    </PostFeed>
  );
}
