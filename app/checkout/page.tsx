'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';

import { Cart, ShippingAddress, Order } from '@/types';
import { getCart, createOrder } from '@/lib/api';

// Demo Stripe Elements placeholder
const DemoStripeForm = () => (
  <div className="mt-4">
    <div className="form-control">
      <label className="label">
        <span className="label-text">Card Number</span>
      </label>
      <input
        type="text"
        placeholder="4242 4242 4242 4242"
        className="input input-bordered"
        disabled={true}
        defaultValue="4242 4242 4242 4242"
      />
    </div>
    
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Expiry Date</span>
        </label>
        <input
          type="text"
          placeholder="MM/YY"
          className="input input-bordered"
          disabled={true}
          defaultValue="12/25"
        />
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text">CVC</span>
        </label>
        <input
          type="text"
          placeholder="123"
          className="input input-bordered"
          disabled={true}
          defaultValue="123"
        />
      </div>
    </div>
    
    <div className="mt-4 text-sm text-gray-500">
      <p>This is a demo checkout. No actual payment will be processed.</p>
      <p>In a real implementation, this would be replaced with Stripe Elements.</p>
    </div>
  </div>
);

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useAuth();

  useEffect(() => {
    async function loadCart() {
      try {
        const cartData = await getCart();
        if (cartData.items.length === 0) {
          // Redirect to cart if empty
          router.push('/cart');
          return;
        }
        setCart(cartData);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (isLoaded) {
      loadCart();
    }
  }, [isLoaded, router]);

  useEffect(() => {
    // Pre-fill with user info if signed in
    if (isSignedIn && user) {
      setShippingAddress(prev => ({
        ...prev,
        fullName: user.name || '',
      }));
    }
  }, [isSignedIn, user]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!cart || !isSignedIn || !user) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would process payment with Stripe here
      const paymentId = `demo-${Date.now()}`;
      
      // Create order
      const order: Order = await createOrder(
        user.id,
        cart,
        shippingAddress,
        'credit_card',
        paymentId
      );
      
      // Redirect to success page
      router.push(`/checkout/success?orderId=${order.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="mt-4">Loading checkout...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-primary mb-6">Sign In to Checkout</h1>
        <div className="card max-w-lg mx-auto bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Please sign in to continue</h2>
            <p className="mb-4">You need to be signed in to complete your purchase.</p>
            <Link href="/signin?redirect=/checkout" className="btn btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Forms */}
        <div className="flex-grow">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="card bg-base-100 shadow-xl mb-8">
              <div className="card-body">
                <h2 className="card-title text-primary">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Address</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">City</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">State/Province</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Postal Code</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Country</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="card bg-base-100 shadow-xl mb-8">
              <div className="card-body">
                <h2 className="card-title text-primary">Payment Information</h2>
                
                <DemoStripeForm />
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Link href="/cart" className="btn btn-outline">
                Back to Cart
              </Link>
              
              <button 
                type="submit" 
                className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        {cart && (
          <div className="w-full lg:w-96">
            <div className="card bg-base-100 shadow-xl sticky top-4">
              <div className="card-body">
                <h2 className="card-title text-primary">Order Summary</h2>
                
                <div className="py-4">
                  <div className="overflow-y-auto max-h-64">
                    {cart.items.map(item => (
                      <div key={item.productId} className="flex justify-between items-center py-2 border-b">
                        <div className="flex items-center">
                          <span className="badge badge-sm mr-2">{item.quantity}</span>
                          <span>{item.product.name}</span>
                        </div>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between py-2 mt-4">
                    <span>Subtotal</span>
                    <span>${cart.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Tax</span>
                    <span>${cart.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Shipping</span>
                    <span>
                      {cart.shipping === 0
                        ? "Free"
                        : `$${cart.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between py-2 font-bold text-lg">
                    <span>Total</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 