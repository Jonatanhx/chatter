import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Post } from "./post";
import classes from "./postFeed.module.css";
export function PostFeed() {
  const router = useRouter();
  const { data: posts } = api.post.getAll.useQuery();
  return (
    <div className={classes.postfeed}>
      {posts?.map((post) => (
        <Post
          onClick={() => router.push(`/post/${post.id}`)}
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
