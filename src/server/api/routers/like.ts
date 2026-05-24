import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const likeRouter = createTRPCRouter({
  toggle: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user!.id;

      return ctx.db.$transaction(async (tx) => {
        const existing = await tx.like.findUnique({
          where: { userId_postId: { userId, postId: input.postId } },
        });

        if (existing) {
          await tx.like.delete({
            where: { userId_postId: { userId, postId: input.postId } },
          });
          return tx.post.update({
            where: { id: input.postId, likeCount: { gt: 0 } },
            data: { likeCount: { decrement: 1 } },
          });
        }

        await tx.like.create({
          data: { userId, postId: input.postId },
        });

        return tx.post.update({
          where: { id: input.postId },
          data: { likeCount: { increment: 1 } },
        });
      });
    }),
});
