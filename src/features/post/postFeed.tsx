import classes from "./postFeed.module.css";
export function PostFeed({ children }: { children: React.ReactNode }) {
  return <div className={classes.postfeed}>{children}</div>;
}
