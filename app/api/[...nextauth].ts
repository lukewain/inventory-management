import CredentialsProvider from "next-auth/providers/credentials";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt"

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text"
        },
        password: {
          label: "Password",
          type: "password"
        },
      },
      async authorize(credentials) {
        try {
          const user = await Prisma.user.findUnique({
            where: {
              email: credentials.email
            },
          });

          if (!user || !user?.hashedPassword) {
            throw new Error("Invalid Credentials");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials?.password,
            user.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error("Invalid Credentials")
          }
        }
      }
    },
  )
  ]
}