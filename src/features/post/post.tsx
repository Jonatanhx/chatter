import type { RouterOutputs } from "~/utils/api";
import classes from "./post.module.css";

type Post = NonNullable<RouterOutputs["post"]["getLatest"]>;

export function Post({ post }: { post: Post }) {
  return (
    <div className={classes.postCard}>
      <p className={classes.postCardContent}>{post.content}</p>
    </div>
  );
}
