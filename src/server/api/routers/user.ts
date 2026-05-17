import argon2 from "argon2";
import { getIronSession } from "iron-session";
import z from "zod";
import { sessionOptions } from "~/lib/session";
import type { SessionData } from "~/schemas/authSchemas";
import type { User } from "../../../../generated/prisma";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const registerUserSchema: z.ZodType<
  Pick<User, "email" | "name" | "password">
> = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

export const userRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(registerUserSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: await argon2.hash(input.password),
        },
      });
      const session = await getIronSession<SessionData>(
        ctx.req,
        ctx.res,
        sessionOptions,
      );

      session.user = user;
      await session.save();

      return user;
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
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
      return user;
    }),
});
