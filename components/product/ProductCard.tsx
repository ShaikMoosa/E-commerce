import Image from 'next/image';
import Link from 'next/link';

export interface NutritionInfo {
  calories: number;
  protein: string;
  fat: string;
  carbs: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  nutritionInfo: NutritionInfo;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, description, price, image, category, rating } = product;

  return (
    <div className="card bg-base-100 shadow-xl h-full">
      <figure className="px-4 pt-4">
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          className="rounded-xl object-cover h-48 w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary">
          {name}
          <div className="badge badge-secondary">{category}</div>
        </h2>
        <p className="text-sm line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
          <div className="rating rating-sm">
            <span className="text-xs mr-1">({rating})</span>
            {[...Array(5)].map((_, i) => (
              <input 
                key={i}
                type="radio" 
                name={`rating-${id}`} 
                className="mask mask-star-2 bg-secondary" 
                defaultChecked={i < Math.round(rating)}
                disabled
              />
            ))}
          </div>
        </div>
        <div className="card-actions justify-between mt-4">
          <Link 
            href={`/products/${id}`}
            className="btn btn-outline btn-primary btn-sm"
          >
            Details
          </Link>
          <button className="btn btn-secondary btn-sm">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 