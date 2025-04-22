# NextAuth.js Setup Instructions

We've added the necessary files to integrate NextAuth.js for authentication in your e-commerce project. Follow these steps to complete the setup:

## 1. Install Required Packages

Since the package manager commands weren't working in your environment, you'll need to manually install the required packages:

```bash
# Using npm
npm install next-auth

# Using yarn
yarn add next-auth

# Using pnpm
pnpm add next-auth
```

## 2. Configure Environment Variables

We've created a `.env.local` file with the required environment variables. You need to:

1. Set a strong, unique `NEXTAUTH_SECRET` (you can generate one with `openssl rand -base64 32`)
2. Set the correct `NEXTAUTH_URL` (use your production URL in production)
3. For Google authentication:
   - Create OAuth credentials in the [Google Cloud Console](https://console.cloud.google.com/)
   - Add your Google Client ID and Secret to `.env.local`

## 3. Update TypeScript Configuration

The TypeScript errors you're seeing are because the type definitions for NextAuth.js need to be properly set up. We've added the necessary type declarations in `types/next-auth.d.ts` but you might need to adjust your TSConfig to use them correctly.

## 4. Files We've Created/Modified

1. **Authentication API Route:** `app/api/auth/[...nextauth]/route.ts`
   - This is the core of NextAuth.js that handles authentication requests
   - You can customize the providers and callbacks as needed

2. **Sign In Page:** `app/signin/page.tsx`
   - A customized sign-in page using your existing UI style

3. **Sign Up Page:** `app/signup/page.tsx`
   - A registration page (note: you'll need to implement the actual user creation logic)

4. **Auth Hook:** `lib/hooks/useAuth.ts`
   - A custom hook that wraps NextAuth.js's `useSession` to match the interface you were using with Clerk

5. **Auth Provider:** `app/providers.tsx`
   - Makes the auth session available throughout your application

6. **Root Layout:** Modified `app/layout.tsx`
   - Replaced Clerk's provider with NextAuth.js's provider

7. **Checkout Page:** Modified `app/checkout/page.tsx`
   - Updated to use our custom auth hook instead of Clerk

## 5. Create Custom Database Adapter (Optional)

For a production app, you'll want to store users in your own database. NextAuth.js supports various database adapters:

- [Prisma](https://next-auth.js.org/adapters/prisma)
- [MongoDB](https://next-auth.js.org/adapters/mongodb)
- [Fauna](https://next-auth.js.org/adapters/fauna)
- [Supabase](https://next-auth.js.org/adapters/supabase)
- [Custom Adapter](https://next-auth.js.org/tutorials/creating-a-database-adapter)

## 6. Add User Registration Logic

Our sign-up page has the UI for registration, but you'll need to implement the backend logic to create users. This typically involves:

1. Creating an API route at `app/api/auth/signup/route.ts`
2. Handling the form submission to this endpoint
3. Creating the user in your database
4. Handling validation, error cases, etc.

## 7. Test Authentication Flow

After completing the setup:

1. Start your development server
2. Try signing in with credentials or Google
3. Test the checkout flow to ensure auth is working correctly
4. Verify that the user's information is properly displayed

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [NextAuth.js with App Router](https://next-auth.js.org/tutorials/app-dir)
- [NextAuth.js Configuration Options](https://next-auth.js.org/configuration/options)
- [NextAuth.js TypeScript](https://next-auth.js.org/getting-started/typescript)

## Troubleshooting

If you encounter TypeScript errors:

1. Make sure the `next-auth` package is properly installed
2. Check that your type declarations in `types/next-auth.d.ts` are correctly formatted
3. You might need to restart your TypeScript server (in VS Code: Ctrl+Shift+P, "TypeScript: Restart TS Server")
4. Consider using the `any` type as a temporary workaround for complex type issues 