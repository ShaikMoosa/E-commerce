import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { getProductsByCategory } from '@/lib/api';

type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = params;
  
  // Map category to display name for better titles
  const categoryDisplayNames: Record<string, string> = {
    'purees': 'Purees & Baby Food',
    'cereals': 'Cereals & Grains',
    'snacks': 'Snacks & Finger Foods',
  };
  
  const displayName = categoryDisplayNames[category] || category;
  
  return {
    title: `${displayName} | Baby Food E-Commerce`,
    description: `Browse our selection of organic ${category} for your little one`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = params;
  
  const validCategories = ['purees', 'cereals', 'snacks'];
  if (!validCategories.includes(category)) {
    notFound();
  }
  
  const products = await getProductsByCategory(category);
  
  const categoryInfo = {
    purees: {
      title: 'Organic Purees',
      description: 'Our smooth, nutrient-rich purees are perfect for babies starting their solid food journey. Made with organic fruits and vegetables with no added preservatives or artificial ingredients.',
      ageRange: '4+ months',
    },
    cereals: {
      title: 'Nutritious Cereals',
      description: 'Iron-fortified cereals made with whole grains to support your baby\'s growth and development. Our cereals are easy to digest and can be mixed with breast milk or formula.',
      ageRange: '6+ months',
    },
    snacks: {
      title: 'Healthy Snacks',
      description: 'Delicious finger foods and snacks designed for little hands to grip. Perfect for encouraging self-feeding and developing fine motor skills.',
      ageRange: '8+ months',
    },
  };
  
  const info = categoryInfo[category as keyof typeof categoryInfo];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/categories">Categories</a></li>
          <li>{info.title}</li>
        </ul>
      </div>
      
      <div className="bg-neutral rounded-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">{info.title}</h1>
        <div className="flex items-center mb-4">
          <span className="badge badge-secondary p-3 mr-2">{info.ageRange}</span>
          <span className="badge badge-outline p-3">100% Organic</span>
        </div>
        <p className="text-lg max-w-3xl">{info.description}</p>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-500">No products found in this category</h2>
          <p className="mt-4">Please check back later for new additions to our collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      <div className="mt-12 p-6 bg-base-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-4">Feeding Tips for {info.title}</h2>
        
        {category === 'purees' && (
          <ul className="list-disc pl-6 space-y-2">
            <li>Start with single-ingredient purees to identify any potential allergies</li>
            <li>Introduce new foods every 3-5 days</li>
            <li>Start with 1-2 tablespoons per feeding, gradually increasing</li>
            <li>Always check the temperature before feeding</li>
            <li>Store unopened purees in a cool, dry place; refrigerate after opening</li>
          </ul>
        )}
        
        {category === 'cereals' && (
          <ul className="list-disc pl-6 space-y-2">
            <li>Mix with breast milk, formula, or water to desired consistency</li>
            <li>Start with a thin consistency and gradually thicken</li>
            <li>Iron-rich cereals are important for brain development</li>
            <li>Refrigerate prepared cereal and use within 24 hours</li>
            <li>Try adding fruit purees to cereals for variety</li>
          </ul>
        )}
        
        {category === 'snacks' && (
          <ul className="list-disc pl-6 space-y-2">
            <li>Always supervise your baby during snack time</li>
            <li>Offer snacks when baby can sit upright and has developed pincer grasp</li>
            <li>Start with soft, easily dissolving snacks</li>
            <li>Cut larger snacks into appropriate sizes to prevent choking</li>
            <li>Store in an airtight container after opening</li>
          </ul>
        )}
      </div>
    </div>
  );
} 