'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 'ORD-12345',
    date: '2023-10-15',
    status: 'delivered',
    total: 249.97,
    items: [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        quantity: 1,
        price: 129.99,
        image: '/images/products/headphones.jpg'
      },
      {
        id: '2',
        name: 'Smart Watch Series 5',
        quantity: 1,
        price: 119.98,
        image: '/images/products/watch.jpg'
      }
    ]
  },
  {
    id: 'ORD-12346',
    date: '2023-11-02',
    status: 'shipped',
    total: 59.99,
    items: [
      {
        id: '3',
        name: 'Portable Power Bank 10000mAh',
        quantity: 1,
        price: 59.99,
        image: '/images/products/powerbank.jpg'
      }
    ]
  }
];

const OrdersPage = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/signin?callbackUrl=/account/orders');
    } else if (isLoaded) {
      // In a real app, you would fetch orders from an API
      // For demo purposes, we're using mock data
      setOrders(mockOrders);
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn, router]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Link href="/account/profile" className="btn btn-outline">
          Back to Profile
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h2 className="text-2xl font-medium mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Link href="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex flex-wrap justify-between">
                  <div className="mb-2 md:mb-0">
                    <span className="text-gray-500">Order ID:</span>
                    <span className="ml-2 font-medium">{order.id}</span>
                  </div>
                  <div className="mb-2 md:mb-0">
                    <span className="text-gray-500">Date:</span>
                    <span className="ml-2">{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div className="mb-2 md:mb-0">
                    <span className="text-gray-500">Total:</span>
                    <span className="ml-2 font-medium">${order.total.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium mb-3">Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="sm:ml-auto flex items-center">
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t flex justify-between">
                <button className="btn btn-outline btn-sm">
                  View Details
                </button>
                {order.status === 'delivered' && (
                  <button className="btn btn-primary btn-sm">
                    Write a Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage; 