import { CreatePostForm } from "~/components/createPostForm";
import { PostFeed } from "~/features/post/postFeed";
import { api } from "~/utils/api";

export default function Home() {
  const { data: user } = api.user.getUserByEmail.useQuery({
    email: "admin@admin.com",
  });

  return (
    <>
      {user && <CreatePostForm user={user} />}
      <PostFeed />
    </>
  );
}
