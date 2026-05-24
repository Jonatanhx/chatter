import { createCommentSchema, deleteCommentSchema } from "~/schemas/comment";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCommentSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {
        const comment = await tx.comment.create({
          data: {
            content: input.content,
            image: input.image,
            userId: ctx.session.user!.id,
            postId: input.postId,
          },
        });

        await tx.post.update({
          where: { id: input.postId },
          data: { commentCount: { increment: 1 } },
        });

        return comment;
      });
    }),

  delete: protectedProcedure
    .input(deleteCommentSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {
        const comment = await tx.comment.delete({
          where: { id: input.id },
        });

        await tx.post.update({
          where: { id: comment.postId, commentCount: { gt: 0 } },
          data: { commentCount: { decrement: 1 } },
        });

        return comment;
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.comment.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
