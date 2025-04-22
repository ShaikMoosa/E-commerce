'use client';

import { useState, useEffect } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState<Record<string, any> | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || searchParams.get('redirect') || '/';

  useEffect(() => {
    // Fetch available providers
    const loadProviders = async () => {
      const availableProviders = await getProviders();
      setProviders(availableProviders);
    };
    loadProviders();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Redirect after successful sign in
      router.push(callbackUrl);
    } catch (error) {
      setError('An error occurred during sign in. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Sign In</h1>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
            {providers && providers.google && (
              <>
                <div className="divider my-6">OR</div>
                
                <button
                  onClick={() => signIn('google', { callbackUrl })}
                  className="btn btn-outline w-full mb-4"
                >
                  Sign in with Google
                </button>
              </>
            )}
            
            <div className="text-center mt-4">
              <p>Don't have an account? <Link href="/signup" className="text-primary">Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 