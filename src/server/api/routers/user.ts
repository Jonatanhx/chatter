import { TRPCError } from "@trpc/server";
import { getIronSession } from "iron-session";
import z from "zod";
import { sessionOptions } from "~/lib/session";
import { SignInSchema, type SessionData } from "~/schemas/authSchemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  verifyCredentials: publicProcedure
    .input(SignInSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email, password: input.password },
      });
      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      } else {
        const session = await getIronSession<SessionData>(
          ctx.req,
          ctx.res,
          sessionOptions,
        );
        session.user = { id: user.id, email: user.email };
        await session.save();

        return user;
      }
    }),
  getUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
      return user;
    }),
});
