import { handleAuth, getSession } from "@auth0/nextjs-auth0";

export const auth0 = {
  handle: handleAuth(),
  async getSession() {
    return await getSession();
  },
  async requireSession() {
    const session = await getSession();
    if (!session?.user) throw new Error("Unauthorized");
    return session;
  },
};