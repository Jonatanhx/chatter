import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const retweetRouter = createTRPCRouter({
  toggle: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user!.id;

      return ctx.db.$transaction(async (tx) => {
        const existing = await tx.retweet.findUnique({
          where: { userId_postId: { userId, postId: input.postId } },
        });

        if (existing) {
          await tx.retweet.delete({
            where: { userId_postId: { userId, postId: input.postId } },
          });
          return tx.post.update({
            where: { id: input.postId, retweetCount: { gt: 0 } },
            data: { retweetCount: { decrement: 1 } },
          });
        }

        await tx.retweet.create({
          data: { userId, postId: input.postId },
        });

        return tx.post.update({
          where: { id: input.postId },
          data: { retweetCount: { increment: 1 } },
        });
      });
    }),
});
