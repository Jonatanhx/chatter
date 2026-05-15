import z from "zod";
import type { User } from "../../generated/prisma";

export const SignInSchema = z.object({
  email: z.string().min(2),
  password: z.string(),
});

export type SignInFormInputs = z.infer<typeof SignInSchema>;

export type SessionData = {
  user?: Pick<User, "id" | "email">;
};
