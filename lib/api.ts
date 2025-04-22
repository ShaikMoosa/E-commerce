import { Product, Cart, Order, ShippingAddress } from '@/types';
import { products } from '@/data/products';

// Product API
export const getProducts = (): Promise<Product[]> => {
  return Promise.resolve(products);
};

export const getProductsByCategory = (category: string): Promise<Product[]> => {
  const filteredProducts = products.filter(product => product.category === category);
  return Promise.resolve(filteredProducts);
};

export const getProductById = (id: number): Promise<Product | null> => {
  const product = products.find(product => product.id === id);
  return Promise.resolve(product || null);
};

// Cart API (using localStorage in browser)
export const getCart = (): Promise<Cart> => {
  if (typeof window === 'undefined') {
    return Promise.resolve({ items: [], subtotal: 0, tax: 0, shipping: 0, total: 0 });
  }
  
  const cartData = localStorage.getItem('cart');
  if (!cartData) {
    return Promise.resolve({ items: [], subtotal: 0, tax: 0, shipping: 0, total: 0 });
  }
  
  try {
    const cart = JSON.parse(cartData) as Cart;
    return Promise.resolve(cart);
  } catch (error) {
    console.error('Error parsing cart data:', error);
    return Promise.resolve({ items: [], subtotal: 0, tax: 0, shipping: 0, total: 0 });
  }
};

export const addToCart = async (productId: number, quantity: number): Promise<Cart> => {
  if (typeof window === 'undefined') {
    return { items: [], subtotal: 0, tax: 0, shipping: 0, total: 0 };
  }
  
  const product = await getProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  
  const cart = await getCart();
  
  // Check if product is already in cart
  const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
  
  if (existingItemIndex >= 0) {
    // Update quantity if product already exists in cart
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.items.push({
      productId,
      quantity,
      product
    });
  }
  
  // Calculate cart totals
  const subtotal = cart.items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.07; // 7% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping;
  
  const updatedCart: Cart = {
    items: cart.items,
    subtotal,
    tax,
    shipping,
    total
  };
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  
  return updatedCart;
};

export const updateCartItem = async (productId: number, quantity: number): Promise<Cart> => {
  if (typeof window === 'undefined') {
    return { items: [], subtotal: 0, tax: 0, shipping: 0, total: 0 };
  }
  
  const cart = await getCart();
  
  const itemIndex = cart.items.findIndex(item => item.productId === productId);
  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    cart.items = cart.items.filter(item => item.productId !== productId);
  } else {
    // Update quantity
    cart.items[itemIndex].quantity = quantity;
  }
  
  // Recalculate cart totals
  const subtotal = cart.items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.07; // 7% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping;
  
  const updatedCart: Cart = {
    items: cart.items,
    subtotal,
    tax,
    shipping,
    total
  };
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  
  return updatedCart;
};

export const clearCart = (): Promise<Cart> => {
  if (typeof window === 'undefined') {
    return Promise.resolve({ items: [], subtotal: 0, tax: 0, shipping: 0, total: 0 });
  }
  
  const emptyCart: Cart = { items: [], subtotal: 0, tax: 0, shipping: 0, total: 0 };
  localStorage.setItem('cart', JSON.stringify(emptyCart));
  
  return Promise.resolve(emptyCart);
};

// Mock order API
let mockOrders: Order[] = [];

export const createOrder = async (userId: string, cart: Cart, shippingAddress: ShippingAddress, paymentMethod: string, paymentId?: string): Promise<Order> => {
  if (cart.items.length === 0) {
    throw new Error('Cannot create order with empty cart');
  }
  
  const orderItems = cart.items.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.product.price,
    name: item.product.name
  }));
  
  const now = new Date().toISOString();
  
  const order: Order = {
    id: `order-${Date.now()}`,
    userId,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    paymentId,
    subtotal: cart.subtotal,
    tax: cart.tax,
    shipping: cart.shipping,
    total: cart.total,
    status: 'pending',
    createdAt: now,
    updatedAt: now
  };
  
  // Store order in mock database
  mockOrders.push(order);
  
  // Clear cart after successful order
  await clearCart();
  
  return order;
};

export const getOrdersByUserId = (userId: string): Promise<Order[]> => {
  const userOrders = mockOrders.filter(order => order.userId === userId);
  return Promise.resolve(userOrders);
};

export const getOrderById = (orderId: string): Promise<Order | null> => {
  const order = mockOrders.find(order => order.id === orderId);
  return Promise.resolve(order || null);
};

export const updateOrderStatus = (orderId: string, status: Order['status'], trackingNumber?: string): Promise<Order | null> => {
  const orderIndex = mockOrders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) {
    return Promise.resolve(null);
  }
  
  mockOrders[orderIndex] = {
    ...mockOrders[orderIndex],
    status,
    trackingNumber: trackingNumber || mockOrders[orderIndex].trackingNumber,
    updatedAt: new Date().toISOString()
  };
  
  return Promise.resolve(mockOrders[orderIndex]);
}; 