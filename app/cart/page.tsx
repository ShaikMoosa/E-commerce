'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Cart as CartType, CartItem } from '@/types';
import { getCart, updateCartItem, clearCart } from '@/lib/api';

export default function CartPage() {
  const [cart, setCart] = useState<CartType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadCart() {
      try {
        const cartData = await getCart();
        setCart(cartData);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadCart();
  }, []);

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    try {
      const updatedCart = await updateCartItem(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      const emptyCart = await clearCart();
      setCart(emptyCart);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="mt-4">Loading your cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-primary mb-6">Your Cart</h1>
        <div className="card max-w-lg mx-auto bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Your cart is empty</h2>
            <p className="mb-4">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/categories" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-grow">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item: CartItem) => (
                  <tr key={item.productId}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image 
                              src={item.product.image} 
                              alt={item.product.name}
                              width={48}
                              height={48}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.product.name}</div>
                          <div className="text-sm opacity-50">{item.product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td>${item.product.price.toFixed(2)}</td>
                    <td>
                      <div className="join">
                        <button 
                          className="btn btn-xs join-item"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 join-item bg-base-200 flex items-center justify-center text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          className="btn btn-xs join-item"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button 
                        className="btn btn-ghost btn-xs"
                        onClick={() => handleUpdateQuantity(item.productId, 0)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-end mt-6">
            <button 
              className="btn btn-outline btn-sm"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Order Summary</h2>
              
              <div className="py-4">
                <div className="flex justify-between py-2">
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
                <div className="flex justify-between py-2 font-bold">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="card-actions">
                <button 
                  className="btn btn-primary w-full"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
              
              <p className="text-xs text-center mt-4">
                Free shipping on orders over $50. All prices in USD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 