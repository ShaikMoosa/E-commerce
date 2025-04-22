import { useSession, signIn, signOut } from 'next-auth/react';

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  isLoaded: boolean;
  isSignedIn: boolean;
  signIn: typeof signIn;
  signOut: typeof signOut;
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const authenticated = status === "authenticated";

  const user: User | null = session?.user
    ? {
        id: session.user.id || session.user.email || "",
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        provider: session.user.provider,
      }
    : null;
  
  return {
    user,
    loading,
    authenticated,
    isLoaded: status !== 'loading',
    isSignedIn: status === 'authenticated',
    signIn,
    signOut
  };
} 