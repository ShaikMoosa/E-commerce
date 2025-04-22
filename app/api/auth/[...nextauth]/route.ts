import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { User } from 'next-auth';

// Extend the User type to include provider
interface ExtendedUser extends User {
  provider?: string;
}

// For demo purposes only - this would be stored in a database in a real app
let users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    password: 'password'
  }
];

// Extend the credentials type to include our custom fields
interface ExtendedCredentials {
  email: string;
  password: string;
  _isSignup?: string;
  _name?: string;
}

// Define the authentication providers and configuration
const handler = NextAuth({
  providers: [
    // Only add Google provider if credentials are available
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    // Credentials provider for username/password login
    CredentialsProvider({
      // The name to display on the sign in form
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        _isSignup: { label: 'Is Signup', type: 'text' },
        _name: { label: 'Name', type: 'text' }
      },
      async authorize(credentials) {
        // In a real app, you would verify credentials against a database
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const extendedCredentials = credentials as ExtendedCredentials;

        // Check if this is the demo user
        const existingUser = users.find(user => user.email === extendedCredentials.email);
        
        if (existingUser && existingUser.password === extendedCredentials.password) {
          return {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            provider: 'credentials'
          } as ExtendedUser;
        }
        
        // For demo purposes: If we're coming from signup page, create a new user
        if (extendedCredentials._isSignup === 'true') {
          const newUserId = `user-${Date.now()}`;
          const newUser = {
            id: newUserId,
            name: extendedCredentials._name || 'New User',
            email: extendedCredentials.email,
            password: extendedCredentials.password
          };
          
          // Add to our in-memory users array (in a real app, this would be saved to a database)
          users.push(newUser);
          
          return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            provider: 'credentials'
          } as ExtendedUser;
        }
        
        return null;
      }
    }),
  ],
  pages: {
    signIn: '/signin',
    // You can define custom pages for other auth actions as well
    // signOut: '/signout',
    // error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Add user data to the token if available
      if (user) {
        token.userId = user.id;
        // Add provider information when signing in
        if (account) {
          token.provider = account.provider;
        } else if ((user as ExtendedUser).provider) {
          token.provider = (user as ExtendedUser).provider;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to the session
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  // Secret is used to encrypt the JWT token
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
});

export { handler as GET, handler as POST }; 