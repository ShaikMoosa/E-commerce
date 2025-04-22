'use client';

import { useState } from 'react';
import { addToCart } from '@/lib/api';

interface AddToCartButtonProps {
  productId: number;
}

const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(productId, quantity);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center mb-3">
        <div className="join">
          <button
            className="btn btn-sm join-item"
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isAdding}
          >
            -
          </button>
          <span className="px-4 py-1 join-item bg-base-200 flex items-center justify-center">
            {quantity}
          </span>
          <button
            className="btn btn-sm join-item"
            onClick={increaseQuantity}
            disabled={isAdding}
          >
            +
          </button>
        </div>
      </div>
      
      <button 
        className={`btn ${isAdding ? 'loading' : ''} btn-secondary`}
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
      
      {showSuccess && (
        <div className="alert alert-success mt-3 py-2 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Added to cart!</span>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton; 