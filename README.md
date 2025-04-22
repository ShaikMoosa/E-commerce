# BabyBites - Baby Food E-Commerce Platform

BabyBites is a modern e-commerce platform built with Next.js, Tailwind CSS, and DaisyUI, specializing in premium organic baby food products for parents aged 25-40.

## Features

- **User-friendly interface** with responsive design
- **Product categories** (purees, cereals, snacks) for easy browsing
- **Detailed product pages** with nutritional information
- **Shopping cart** functionality with real-time updates
- **Checkout process** with shipping and payment options
- **Order tracking** and history
- **User authentication** with Clerk
- **Admin dashboard** for product management (coming soon)

## Tech Stack

- **Frontend**: Next.js (React), TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **Authentication**: Clerk
- **State Management**: React hooks
- **Payment Processing**: Stripe (simulated in demo)
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/babybites.git
   cd babybites
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
├── app/                  # Next.js app router
│   ├── categories/       # Product categories pages
│   ├── products/         # Product detail pages
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout process
│   ├── account/          # User account pages
│   └── ...
├── components/           # Reusable React components
│   ├── cart/             # Cart-related components
│   ├── layout/           # Layout components (header, footer)
│   ├── product/          # Product-related components
│   └── ...
├── lib/                  # Utility functions and API
├── types/                # TypeScript type definitions
├── data/                 # Mock data (for demo)
└── public/               # Static assets
```

## Future Enhancements

- Admin dashboard for product management
- Email notifications for orders
- Advanced filtering and search
- Reviews and ratings system
- Subscription service for recurring orders
- Wishlist functionality
- Enhanced mobile app experience

## Credits

- Product images from [Pexels](https://www.pexels.com/)
- Icons from [DaisyUI](https://daisyui.com/) and [Heroicons](https://heroicons.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 