import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import AddToCartButton from '@/components/cart/AddToCartButton';
import { getProductById } from '@/lib/api';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = parseInt(params.id);
  const product = await getProductById(productId);
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found',
    };
  }
  
  return {
    title: `${product.name} | Baby Food E-Commerce`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const productId = parseInt(params.id);
  const product = await getProductById(productId);
  
  if (!product) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/categories">Categories</Link></li>
          <li><Link href={`/categories/${product.category}`}>{product.category}</Link></li>
          <li>{product.name}</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-xl overflow-hidden shadow-xl">
          <div className="relative h-[400px]">
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
          
          <div className="flex items-center mt-2 mb-4">
            <div className="rating rating-sm mr-2">
              {[...Array(5)].map((_, i) => (
                <input 
                  key={i}
                  type="radio" 
                  name={`rating-${product.id}`} 
                  className="mask mask-star-2 bg-secondary" 
                  defaultChecked={i < Math.round(product.rating)}
                  disabled
                />
              ))}
            </div>
            <span className="text-sm">({product.rating})</span>
            <div className="badge badge-secondary ml-4">{product.category}</div>
          </div>
          
          <p className="text-lg mt-4">{product.description}</p>
          
          <div className="bg-neutral p-4 rounded-lg mt-6">
            <h3 className="font-bold mb-2">Nutrition Information</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm opacity-70">Calories:</span>
                <span className="font-medium ml-2">{product.nutritionInfo.calories}</span>
              </div>
              <div>
                <span className="text-sm opacity-70">Protein:</span>
                <span className="font-medium ml-2">{product.nutritionInfo.protein}</span>
              </div>
              <div>
                <span className="text-sm opacity-70">Fat:</span>
                <span className="font-medium ml-2">{product.nutritionInfo.fat}</span>
              </div>
              <div>
                <span className="text-sm opacity-70">Carbs:</span>
                <span className="font-medium ml-2">{product.nutritionInfo.carbs}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-8">
            <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
            <AddToCartButton productId={product.id} />
          </div>
          
          <div className="mt-6 p-4 bg-base-100 rounded-lg border border-neutral">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">100% Secure Payment</span>
            </div>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h5.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-5a1 1 0 00-.293-.707L16.5 3H11V1.5a1.5 1.5 0 00-3 0V3H3z" />
              </svg>
              <span className="font-medium">Fast Shipping</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-primary mb-6">You might also like</h2>
        
        {/* Here we would normally fetch and display related products */}
        <div className="text-center py-10">
          <p className="text-lg">Check out more products in our 
            <Link href={`/categories/${product.category}`} className="text-primary font-medium ml-1 hover:underline">
              {product.category} section
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 