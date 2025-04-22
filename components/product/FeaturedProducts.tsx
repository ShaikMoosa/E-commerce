import React from 'react';
import ProductCard from './ProductCard';

// Demo featured products data
const featuredProducts = [
  {
    id: 1,
    name: "Apple & Carrot Puree",
    description: "A smooth blend of organic apples and carrots, perfect for introducing solids.",
    price: 3.99,
    category: "purees",
    image: "https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg",
    rating: 4.8,
    nutritionInfo: {
      calories: 45,
      protein: "0.5g",
      fat: "0.1g",
      carbs: "10g"
    }
  },
  {
    id: 2,
    name: "Banana Oatmeal Cereal",
    description: "Iron-fortified oatmeal cereal with organic banana for a nutritious breakfast.",
    price: 4.49,
    category: "cereals",
    image: "https://images.pexels.com/photos/5946057/pexels-photo-5946057.jpeg",
    rating: 4.6,
    nutritionInfo: {
      calories: 110,
      protein: "3g",
      fat: "1.5g",
      carbs: "22g"
    }
  },
  {
    id: 3,
    name: "Sweet Potato Puffs",
    description: "Melt-in-mouth puffs made with organic sweet potatoes. Easy for little hands to grip.",
    price: 2.99,
    category: "snacks",
    image: "https://images.pexels.com/photos/6646233/pexels-photo-6646233.jpeg",
    rating: 4.9,
    nutritionInfo: {
      calories: 25,
      protein: "1g",
      fat: "0g",
      carbs: "5g"
    }
  },
  {
    id: 4,
    name: "Avocado & Pea Puree",
    description: "Creamy avocado blended with sweet peas for a nutrient-rich meal.",
    price: 4.29,
    category: "purees",
    image: "https://images.pexels.com/photos/8108091/pexels-photo-8108091.jpeg",
    rating: 4.7,
    nutritionInfo: {
      calories: 80,
      protein: "2g",
      fat: "6g",
      carbs: "4g"
    }
  }
];

const FeaturedProducts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts; 