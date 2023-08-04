import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '@models/user';

import { connectToDatabase } from '@/utils/database';

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (credentials) => {
      try {
        const response = await fetch('http://localhost:5000/v1/auth/signin', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        const user = await response.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      } catch (error) {
        const errorMessage = error.data.message;
        console.log(errorMessage);
      }
    },
  }),
];

const handler = NextAuth({
  providers,
  pages: {
    signIn: '/auth/signIn',
  },
  callbacks: {
    async session({ session, token }) {
      await connectToDatabase();

      if (token) {
        const sessionUser = await User.findOne({ email: token.email });
        session.user.id = sessionUser._id.toString();
        session.user.username = sessionUser.username;
        session.user.fullname = sessionUser.fullname;
        session.user.image = sessionUser.image;
      }

      if (session) {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
        session.user.username = sessionUser.username;
        session.user.fullname = sessionUser.fullname;
        session.user.image = sessionUser.image;
      }
      return session;
    },
    async signIn({ user, profile }) {
      try {
        await connectToDatabase();
        if (user) {
          return user;
        }
        // check if user already exists
        const userExist = await User.findOne({ email: profile.email });
        // if not, create new user
        if (!userExist || userExist === null) {
          // generate 3 digit random number
          const random = Math.floor(100 + Math.random() * 900);
          let username = '';
          if (profile.name.split(' ').length > 2) {
            username = `${profile.name.split(' ')[0]}${
              profile.name.split(' ')[1]
            }_${random}`.toLowerCase();
          }
          await User.create({
            email: profile.email,
            fullname: profile.name,
            username: username,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token, user, profile }) {
      return {
        ...token,
        ...user,
        ...profile,
      };
    },
  },
});

export { handler as GET, handler as POST };
