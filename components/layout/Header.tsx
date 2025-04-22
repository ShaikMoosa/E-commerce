'use client';

import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { signIn, signOut } from "next-auth/react";

const Header = () => {
  const { isSignedIn, user, isLoaded } = useAuth();

  return (
    <header className="bg-primary text-white">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-primary">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              {isSignedIn && (
                <>
                  <li><Link href="/account/profile">My Profile</Link></li>
                  <li><Link href="/account/orders">My Orders</Link></li>
                </>
              )}
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">BabyBites</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            {isSignedIn && (
              <li><Link href="/account/orders">My Orders</Link></li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="/cart" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item bg-secondary text-primary">0</span>
            </div>
          </Link>
          <div className="ml-4">
            {!isLoaded ? (
              <div className="h-10 w-24 animate-pulse bg-base-300 rounded"></div>
            ) : isSignedIn ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {user?.image ? (
                      <img alt="User avatar" src={user.image} />
                    ) : (
                      <div className="bg-secondary text-primary flex items-center justify-center h-full text-xl">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-primary">
                  <li><Link href="/account/profile">Profile</Link></li>
                  <li><Link href="/account/orders">Orders</Link></li>
                  <li><button onClick={() => signOut()}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <button 
                onClick={() => signIn()} 
                className="btn btn-secondary btn-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 