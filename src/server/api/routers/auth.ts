import { TRPCError } from "@trpc/server";
import argon2 from "argon2";
import { getIronSession } from "iron-session";
import { sessionOptions } from "~/lib/session";
import { SignInSchema, type SessionData } from "~/schemas/authSchemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(SignInSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });
      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (!(await argon2.verify(user.password, input.password))) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect email or password",
        });
      }

      const session = await getIronSession<SessionData>(
        ctx.req,
        ctx.res,
        sessionOptions,
      );

      session.user = user;
      await session.save();

      return user;
    }),
  signOut: publicProcedure.mutation(async ({ ctx }) => {
    const session = await getIronSession<SessionData>(
      ctx.req,
      ctx.res,
      sessionOptions,
    );
    session.destroy();
  }),
  getSession: publicProcedure.query(async ({ ctx }) => {
    const session = await getIronSession<SessionData>(
      ctx.req,
      ctx.res,
      sessionOptions,
    );
    if (!session)
      throw new TRPCError({
        message: "Your session has gone stale, please sign in again",
        code: "UNAUTHORIZED",
      });
    else {
      return session.user;
    }
  }),
});
