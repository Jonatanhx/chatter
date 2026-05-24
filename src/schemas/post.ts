import z from "zod";
import type { Post } from "../../generated/prisma";

export const postSchema = z.object({
  id: z.string(),
  content: z.string(),
  image: z.string().nullable(),
  userId: z.string(),
  postId: z.string(),
  likeCount: z.number(),
  retweetCount: z.number(),
  commentCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Post>;

export const createPostSchema = postSchema.pick({
  content: true,
  image: true,
  userId: true,
});

export const deletePostSchema = postSchema.pick({
  postId: true,
});

export const getPostByIdSchema = postSchema.pick({
  id: true,
});
