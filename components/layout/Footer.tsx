import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-white p-10">
      <div className="container mx-auto">
        <div className="footer">
          <div>
            <span className="footer-title">Products</span>
            <Link href="/categories/purees" className="link link-hover">Purees</Link>
            <Link href="/categories/cereals" className="link link-hover">Cereals</Link>
            <Link href="/categories/snacks" className="link link-hover">Snacks</Link>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <Link href="/about" className="link link-hover">About Us</Link>
            <Link href="/contact" className="link link-hover">Contact</Link>
            <Link href="/faq" className="link link-hover">FAQ</Link>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <Link href="/terms" className="link link-hover">Terms of Use</Link>
            <Link href="/privacy" className="link link-hover">Privacy Policy</Link>
            <Link href="/shipping" className="link link-hover">Shipping Policy</Link>
          </div>
          <div>
            <span className="footer-title">Newsletter</span>
            <div className="form-control w-80">
              <label className="label">
                <span className="label-text text-white">Enter your email for baby food updates</span>
              </label>
              <div className="relative">
                <input type="email" placeholder="username@site.com" className="input input-bordered w-full pr-16 text-gray-800" />
                <button className="btn btn-secondary absolute top-0 right-0 rounded-l-none">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p>Photos from <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Pexels</a></p>
          <p className="mt-2">© {new Date().getFullYear()} BabyBites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 