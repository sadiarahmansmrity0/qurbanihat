'use client';

import Link from 'next/link';
import logo from '../assets/logo.svg';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-stone-900 to-stone-800 text-white pt-16 pb-8 border-t border-rose-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-6 group">
              <img src={logo.src || logo} alt="QurbaniHat Logo" className="h-12 w-auto brightness-0 invert group-hover:scale-105 transition-transform duration-300" />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              QurbaniHat is Bangladesh's leading digital platform for verified halal livestock. We bring the tradition of Qurbani to your fingertips, ensuring health, hygiene, and trust in every booking.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-stone-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 hover:text-white hover:scale-110 transition-all duration-300 shadow-sm">
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-stone-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 hover:text-white hover:scale-110 transition-all duration-300 shadow-sm">
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-stone-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 hover:text-white hover:scale-110 transition-all duration-300 shadow-sm">
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-stone-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 hover:text-white hover:scale-110 transition-all duration-300 shadow-sm">
                <i className="fab fa-youtube text-sm"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-rose-400/50 pb-2 inline-block uppercase tracking-wider text-sm">
              Quick Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-stone-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2 group">
                <i className="fas fa-heart text-[8px] text-rose-400 group-hover:scale-110 transition-transform duration-300"></i>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Home</span>
              </Link></li>
              <li><Link href="/all-animals" className="text-stone-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2 group">
                <i className="fas fa-heart text-[8px] text-rose-400 group-hover:scale-110 transition-transform duration-300"></i>
                <span className="group-hover:translate-x-1 transition-transform duration-300">All Animals</span>
              </Link></li>
              <li><Link href="/login" className="text-stone-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2 group">
                <i className="fas fa-heart text-[8px] text-rose-400 group-hover:scale-110 transition-transform duration-300"></i>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Account Login</span>
              </Link></li>
              <li><Link href="/register" className="text-stone-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2 group">
                <i className="fas fa-heart text-[8px] text-rose-400 group-hover:scale-110 transition-transform duration-300"></i>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Seller Registration</span>
              </Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-rose-400/50 pb-2 inline-block uppercase tracking-wider text-sm">
              Contact Support
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-r group-hover:from-pink-500/20 group-hover:to-rose-500/20 transition-all duration-300">
                  <i className="fas fa-envelope text-rose-400"></i>
                </div>
                <div>
                  <p className="text-stone-200 font-medium">Email Address</p>
                  <a href="mailto:support@qurbanihat.com" className="text-stone-400 hover:text-rose-400 transition-colors duration-300">support@qurbanihat.com</a>
                </div>
              </div>
              <div className="flex gap-3 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-r group-hover:from-pink-500/20 group-hover:to-rose-500/20 transition-all duration-300">
                  <i className="fas fa-phone text-rose-400"></i>
                </div>
                <div>
                  <p className="text-stone-200 font-medium">Phone Number</p>
                  <a href="tel:+8801700000000" className="text-stone-400 hover:text-rose-400 transition-colors duration-300">+880 1700-000000</a>
                </div>
              </div>
              <div className="flex gap-3 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-r group-hover:from-pink-500/20 group-hover:to-rose-500/20 transition-all duration-300">
                  <i className="fas fa-map-marker-alt text-rose-400"></i>
                </div>
                <div>
                  <p className="text-stone-200 font-medium">Office Location</p>
                  <p className="text-stone-400">Zindabazar, Sylhet, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-rose-400/50 pb-2 inline-block uppercase tracking-wider text-sm">
              Newsletter
            </h3>
            <p className="text-stone-400 text-sm mb-4">Subscribe to get updates on new livestock and special offers.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 text-white placeholder:text-stone-500 transition-all duration-300"
              />
              <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-rose-500/20 active:scale-95">
                Subscribe Now ✨
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-xs text-center md:text-left">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} QurbaniHat Platform. 
            <span className="text-rose-400">❤️</span> 
            All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-rose-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-rose-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-rose-400 transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}