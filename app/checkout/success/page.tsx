'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Order } from '@/types';
import { getOrderById } from '@/lib/api';

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) {
        setIsLoading(false);
        return;
      }

      try {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="mt-4">Loading order information...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-6">Order Not Found</h1>
          <p className="mb-6">We couldn't find the order you're looking for.</p>
          <Link href="/" className="btn btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-base-100 shadow-xl rounded-lg overflow-hidden">
        <div className="bg-primary text-white p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-lg mt-2">Thank you for your order.</p>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <h2 className="text-xl font-semibold">Order #{order.id.slice(-8)}</h2>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="badge badge-lg">{order.status}</div>
          </div>
          
          <div className="py-4">
            <h3 className="font-semibold mb-2">Items</h3>
            <div className="overflow-x-auto">
              <table className="table table-compact w-full">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.productId}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="py-4 border-t">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
          
          <div className="py-4 border-t">
            <h3 className="font-semibold mb-2">Payment Details</h3>
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Shipping</span>
              <span>
                {order.shipping === 0
                  ? "Free"
                  : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
          
          {order.trackingNumber && (
            <div className="py-4 border-t">
              <h3 className="font-semibold mb-2">Tracking Information</h3>
              <p>Tracking Number: {order.trackingNumber}</p>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            <Link href="/" className="btn btn-outline">
              Continue Shopping
            </Link>
            <Link href="/account/orders" className="btn btn-primary">
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 