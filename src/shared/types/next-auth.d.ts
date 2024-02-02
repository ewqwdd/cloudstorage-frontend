import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      idToken?: string;
      access_token?: string;
      profile: {
        fullName?: string;
        email: string;
        id: number;
      };
      refresh_token?: string;
    };
  }
}
