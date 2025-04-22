import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: 'purees',
    name: 'Purees',
    description: 'Smooth, organic purees perfect for introducing solids to your baby.',
    image: 'https://images.pexels.com/photos/8108091/pexels-photo-8108091.jpeg',
    ageRange: '4+ months'
  },
  {
    id: 'cereals',
    name: 'Cereals',
    description: 'Nutrient-rich cereals to support your growing baby.',
    image: 'https://images.pexels.com/photos/5946057/pexels-photo-5946057.jpeg',
    ageRange: '6+ months'
  },
  {
    id: 'snacks',
    name: 'Snacks',
    description: 'Healthy snacks perfect for little hands learning to self-feed.',
    image: 'https://images.pexels.com/photos/6646233/pexels-photo-6646233.jpeg',
    ageRange: '8+ months'
  }
];

export const metadata = {
  title: 'Categories | Baby Food E-Commerce',
  description: 'Browse our range of organic baby food categories',
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">
        Product Categories
      </h1>
      
      <div className="flex justify-center mb-8">
        <div className="prose max-w-2xl text-center">
          <p className="text-lg">
            All our products are made with organic ingredients, with no added salt, sugar, preservatives, or artificial colors.
            Each category is designed to support different stages of your baby's food journey.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.id} className="card bg-base-100 shadow-xl">
            <figure className="h-64 relative">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-primary">{category.name}
                <div className="badge badge-secondary">{category.ageRange}</div>
              </h2>
              <p>{category.description}</p>
              <div className="card-actions justify-end mt-4">
                <Link href={`/categories/${category.id}`} className="btn btn-primary">
                  Explore {category.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-neutral p-8 rounded-lg shadow-md mt-16">
        <h2 className="text-2xl font-bold text-primary mb-4">Age-Appropriate Feeding Guide</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Age</th>
                <th>Stage</th>
                <th>Recommended Products</th>
                <th>Feeding Tips</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4-6 months</td>
                <td>Starting Solids</td>
                <td>Smooth purees, Single-ingredient cereals</td>
                <td>Start with 1-2 tablespoons once a day, gradually increasing</td>
              </tr>
              <tr>
                <td>6-8 months</td>
                <td>Expanding Tastes</td>
                <td>Texture purees, Mixed cereals, Soft finger foods</td>
                <td>2-3 meals per day, introduce new foods every 3-5 days</td>
              </tr>
              <tr>
                <td>8-10 months</td>
                <td>Self-Feeding</td>
                <td>Chunky purees, Snacks, Puffs, Finger foods</td>
                <td>3 meals + 2 snacks, encourage self-feeding</td>
              </tr>
              <tr>
                <td>10-12 months</td>
                <td>Table Foods</td>
                <td>All product types, focus on variety</td>
                <td>3 meals + 2-3 snacks, transitioning to family meals</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 