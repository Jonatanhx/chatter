import {
  createPostSchema,
  deletePostSchema,
  getPostByIdSchema,
} from "~/schemas/post";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          content: input.content,
          userId: input.userId,
          image: input.image,
        },
      });
    }),
  delete: protectedProcedure
    .input(deletePostSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: { id: input.postId },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        retweets: {
          select: { userId: true },
        },
        likes: {
          select: { userId: true },
        },
        comments: {
          select: { userId: true },
        },
      },
    });
  }),

  getById: protectedProcedure
    .input(getPostByIdSchema)
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findFirst({
        where: { id: input.id },
        include: {
          retweets: {
            select: { userId: true },
          },
          likes: {
            select: { userId: true },
          },
        },
      });
      return post ?? null;
    }),
});
