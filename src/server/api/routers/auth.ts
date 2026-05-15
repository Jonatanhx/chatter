import { TRPCError } from "@trpc/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "~/lib/session";
import type { SessionData } from "~/schemas/authSchemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
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
