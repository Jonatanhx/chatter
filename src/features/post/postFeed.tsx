import { api } from "~/utils/api";
import { Post } from "./post";
import classes from "./postFeed.module.css";
export function PostFeed() {
  const { data: posts } = api.post.getAll.useQuery();
  return (
    <div className={classes.postfeed}>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
