import axios, { AxiosError } from "axios";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const refreshToken = async(rt: string) => {
  const {data} = await axios.post(process.env.NEXT_PUBLIC_API_URL! + 'auth/refresh', {}, {
    headers: {
      Authorization: 'Bearer ' + rt
    }
  })
  return data
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth'
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          placeholder: "example@mail.com",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) return null;
        try {
          const {data} = await axios.post(process.env.NEXT_PUBLIC_API_URL! + 'auth/local/login', credentials);
          return data;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      try {
        const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL! + 'users/me', {
          headers: {
            //@ts-ignore
            Authorization: 'Bearer ' + (user ? user.access_token : token.access_token)
          }
        })
        return {...token, ...user, profile: data}
      } catch(err) {
        if(err instanceof AxiosError) {
        console.log("first", err.config?.headers.Authorization)
          //@ts-ignore
          const tokens = await refreshToken(user ? user.refresh_token : token.refresh_token)
          try {
            const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL! + 'users/me', {
              headers: {
                Authorization: 'Bearer ' + tokens.access_token
              }
            })
            return {...tokens, ...user, profile: data}
          } catch (err) {
          }
        }
        return {...token, ...user}
      }
    },
    async session({token, session}) {

      //@ts-ignore
      session.user = token

      return session
    }
  }
};

export const getAuthSession = ()=>getServerSession(authOptions)
