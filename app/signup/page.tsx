'use client';

import { useState, useEffect } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState<Record<string, any> | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

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
      // Since we don't have a real backend, we're directly signing in
      // In a real app, you would create the user first via an API call
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        _isSignup: 'true', // Special flag to tell our auth handler this is a signup
        _name: name, // Pass the name for user creation
      });

      if (result?.error) {
        setError('Error signing in after registration');
        setIsLoading(false);
        return;
      }

      // Redirect after successful sign up and sign in
      router.push(callbackUrl);
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign up');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create Account</h1>
        
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
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
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
                  minLength={6}
                />
                <label className="label">
                  <span className="label-text-alt">Must be at least 6 characters</span>
                </label>
              </div>
              
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            {providers && providers.google && (
              <>
                <div className="divider my-6">OR</div>
                
                <button
                  onClick={() => signIn('google', { callbackUrl })}
                  className="btn btn-outline w-full mb-4"
                >
                  Sign up with Google
                </button>
              </>
            )}
            
            <div className="text-center mt-4">
              <p>Already have an account? <Link href="/signin" className="text-primary">Sign in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 