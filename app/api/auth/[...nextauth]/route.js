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
];

const handler = NextAuth({
  providers,
  callbacks: {
    async session({ session }) {
      await connectToDatabase();

      if (session) {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
        session.user.username = sessionUser.username;
        session.user.fullname = sessionUser.fullname;
        session.user.image = sessionUser.image;
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();
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
          } else {
            username = profile.name.replace(' ', '').toLowerCase();
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
  },
});

export { handler as GET, handler as POST };
