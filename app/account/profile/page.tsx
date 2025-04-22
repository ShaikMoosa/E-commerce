'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ProfilePage = () => {
  const { user, isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/signin?callbackUrl=/account/profile');
    } else if (isLoaded) {
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Auth provider (Google, Credentials)
  const authProvider = user?.provider || 'Email/Password';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-primary flex items-center justify-center text-white text-3xl mr-6">
            {user?.image ? (
              <img src={user.image} alt={user.name || 'User'} className="w-full h-full object-cover" />
            ) : (
              <span>{user?.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{user?.name || 'User'}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="border rounded-md p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Account Information</h3>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Name:</p>
              <p>{user?.name || 'Not provided'}</p>
              
              <p className="text-gray-500">Email:</p>
              <p>{user?.email}</p>
              
              <p className="text-gray-500">Account ID:</p>
              <p className="truncate">{user?.id || 'N/A'}</p>
              
              <p className="text-gray-500">Sign in with:</p>
              <p>{authProvider}</p>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Account Settings</h3>
            <div className="space-y-4">
              {authProvider === 'Email/Password' && (
                <button className="btn btn-outline btn-primary w-full">
                  Change Password
                </button>
              )}
              <Link href="/account/orders" className="btn btn-outline w-full">
                View My Orders
              </Link>
              <button className="btn btn-outline btn-error w-full">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 