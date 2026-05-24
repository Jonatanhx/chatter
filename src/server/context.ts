import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "~/lib/session";
import type { SessionData } from "~/schemas/authSchemas";

export async function createContext({ req, res }: CreateNextContextOptions) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  return {
    req,
    res,
    session,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
