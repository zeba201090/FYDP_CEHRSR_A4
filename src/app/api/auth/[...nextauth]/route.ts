import { prisma }  from '@/libs/prisma'
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {patientAuthProvider} from '@/libs/authPatient';
interface Doctor {
  doctor_id: string;
  type: string;
  national_id: string;
  first_name: string;
  last_name: string;
  password: string; // Assuming this is the correct type
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
CredentialsProvider({
  name: 'credentials',
  credentials: {},
  authorize: async (credentials: any) => {

     const {type} = credentials as { type: string };
     console.log("heeeeeeeeeeeeereeeeeeeeee",type);
     
     
      

      const { national_id, password } = credentials as {
        national_id: string;
        password: string;
      };

      if (!national_id || !password) {
        return null;
      }

      if (type === 'doctor') {

      const user = await prisma.doctor.findUnique({
        where: {
          national_id: national_id,
        },
      });

      if (!user) {
        return null;
      }

      const isPasswordValid = password === user.password;

      if (!isPasswordValid) {
        return null;
      }

      return {
        id: user.doctor_id + '',
        national_id: user.national_id,
        name: user.first_name + ' ' + user.last_name,
        randomKey: 'Hey cool',
      }  // Adjust User type accordingly
      
    }

    else 
     {
      console.log("inside else",type);

        const user = await patientAuthProvider(credentials);
        return Promise.resolve(user);
  }
    }}
),


  ],
  pages: {
    signIn: '/doctorsLogin',
    
  },
 
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey
        }
      }
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          
        }
      }
      return token
    }
  }
}




const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };