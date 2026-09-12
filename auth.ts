import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getEnvironment } from "@/src/config/env";
import { authenticateUser } from "@/src/lib/auth/user";
import { loginSchema } from "@/src/lib/auth/schemas";
import { logger } from "@/src/lib/logger";

export const authOptions: NextAuthOptions = {
  secret: getEnvironment().AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const user = await authenticateUser(parsed.data.email, parsed.data.password);
        if (!user) {
          logger.warn("Login failed");
          return null;
        }
        logger.info("Login succeeded", { userId: user.id });
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) token.id = user.id;
      return token;
    },
    session: ({ session, token }) => {
      if (token.id) session.user.id = token.id;
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "lifetrack.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: getEnvironment().NODE_ENV === "production",
      },
    },
  },
};
export default NextAuth(authOptions);
