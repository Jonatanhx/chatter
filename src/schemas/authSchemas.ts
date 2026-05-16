import z from "zod";
import type { User } from "../../generated/prisma";

export const SignInSchema = z.object({
  email: z.string().min(2),
  password: z.string(),
});

export const RegisterUserSchema = z.object({});

export type SignInFormInputs = z.infer<typeof SignInSchema>;
export type RegisterUserFormInputs = Pick<User, "name" | "email" | "password">;

export type SessionData = {
  user?: User;
};
