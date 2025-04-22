import Image from 'next/image'
import Link from 'next/link'
import FeaturedProducts from '@/components/product/FeaturedProducts'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Banner */}
      <div className="hero min-h-[500px] rounded-lg overflow-hidden my-8 bg-neutral">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src="https://images.pexels.com/photos/8107967/pexels-photo-8107967.jpeg"
            alt="Fresh organic baby food purees"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold text-primary">Nourishing Your Little One</h1>
            <p className="py-6 text-lg">
              Premium organic baby food made with love. Nutritious, delicious, and perfect for your growing baby.
            </p>
            <Link href="/categories" className="btn btn-primary">Explore Products</Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Our Bestsellers</h2>
        <FeaturedProducts />
      </div>

      {/* Why Choose Us */}
      <div className="py-12 bg-neutral rounded-lg my-8 p-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Why Parents Choose BabyBites</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-4xl text-secondary mb-4">🌱</div>
              <h3 className="card-title text-primary">100% Organic</h3>
              <p>All ingredients sourced from certified organic farms without pesticides or GMOs.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-4xl text-secondary mb-4">👨‍🍳</div>
              <h3 className="card-title text-primary">Chef-Crafted</h3>
              <p>Recipes developed by pediatric nutritionists and award-winning chefs.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-4xl text-secondary mb-4">📦</div>
              <h3 className="card-title text-primary">Delivered Fresh</h3>
              <p>Convenient deliveries right to your doorstep, always fresh and ready to serve.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-12 text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-primary">Ready to Start Your Baby's Flavor Journey?</h2>
        <p className="mb-6 text-lg max-w-2xl mx-auto">
          Join thousands of happy parents providing the best nutrition for their little ones.
        </p>
        <Link href="/categories" className="btn btn-lg btn-primary">Shop Now</Link>
      </div>
    </div>
  )
} 