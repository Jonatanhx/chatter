import { useRouter } from "next/router";
import { Post } from "~/features/post/post";
import { api } from "~/utils/api";

export default function PostPage() {
  const router = useRouter();
  const slug = router.query.slug;
  if (!router.isReady || typeof slug !== "string") return null;
  const { data: post } = api.post.getById.useQuery({ id: slug });
  if (!post) return null;
  return (
    <div>
      <Post post={post}></Post>
    </div>
  );
}
