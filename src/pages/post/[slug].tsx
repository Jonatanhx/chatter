import { useRouter } from "next/router";
import { Post } from "~/features/post/post";
import { api } from "~/utils/api";

export default function PostPage() {
  const router = useRouter();
  const slug = router.query.slug;

  const { data: post } = api.post.getById.useQuery(
    { id: slug as string },
    { enabled: router.isReady && typeof slug === "string" },
  );

  if (!post) return null;

  return (
    <div>
      <Post post={post} />
    </div>
  );
}
