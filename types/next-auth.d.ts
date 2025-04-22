import 'next-auth';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string | null;
    }
  }
}

// Extend the JWT type
declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    provider?: string | null;
  }
}

// Declaration for next-auth/react module
declare module 'next-auth/react' {
  export function signIn(provider?: string, options?: Record<string, any>, authorizationParams?: Record<string, any>): Promise<any>;
  export function signOut(options?: { callbackUrl?: string, redirect?: boolean }): Promise<any>;
  export function useSession(): any;
  export function getSession(options?: { req?: any }): Promise<Session | null>;
  export function getCsrfToken(options?: { req?: any }): Promise<string | null>;
  export function getProviders(): Promise<Record<string, any>>;
  export const SessionProvider: React.FC<{ session?: any, children?: React.ReactNode }>;
} 