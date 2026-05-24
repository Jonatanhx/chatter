import z from "zod";
import type { Comment } from "../../generated/prisma";

export const commentSchema = z.object({
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
}) satisfies z.ZodType<Comment>;

export const createCommentSchema = commentSchema.pick({
  content: true,
  image: true,
  userId: true,
  postId: true,
});

export const deleteCommentSchema = commentSchema.pick({
  id: true,
});
