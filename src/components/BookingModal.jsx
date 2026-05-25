'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import logo from '../assets/logo.svg';

export default function BookingModal({ animal, user, onClose }) {
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('✨ Booking completed! We will contact you soon. ✨');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-center text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
          
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
          
          <div className="flex justify-center mb-4 relative z-10">
            <img src={logo.src || logo} alt="QurbaniHat Logo" className="h-12 w-auto brightness-0 invert drop-shadow-md" />
          </div>
          <h2 className="text-2xl font-bold relative z-10">Book Your Animal</h2>
          <p className="text-white/80 font-light mt-1 relative z-10">
            Complete the form to confirm your booking for <span className="font-semibold">{animal.name}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-500 flex items-center gap-2 uppercase tracking-wider">
                <i className="fas fa-user text-rose-400 text-xs"></i>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-pink-50/30 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 text-stone-700 placeholder:text-stone-300"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-500 flex items-center gap-2 uppercase tracking-wider">
                <i className="fas fa-envelope text-rose-400 text-xs"></i>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-pink-50/30 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 text-stone-700 placeholder:text-stone-300"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-500 flex items-center gap-2 uppercase tracking-wider">
              <i className="fas fa-phone text-rose-400 text-xs"></i>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-pink-50/30 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 text-stone-700 placeholder:text-stone-300"
              placeholder="+880 1XXX XXXXXX"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-500 flex items-center gap-2 uppercase tracking-wider">
              <i className="fas fa-map-marker-alt text-rose-400 text-xs"></i>
              Delivery Address
            </label>
            <textarea
              name="address"
              required
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-pink-50/30 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 text-stone-700 placeholder:text-stone-300 resize-none"
              placeholder="Your full delivery address..."
            ></textarea>
          </div>

          {/* Animal Summary Card */}
          <div className="pt-2">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                  <i className="fas fa-paw text-rose-400 text-sm"></i>
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">Selected Animal</p>
                  <p className="font-semibold text-stone-700 text-sm">{animal.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-stone-400 font-medium">Total Amount</p>
                <p className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  ৳{animal.price.toLocaleString()}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-rose-200/50 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <i className="fas fa-check-circle text-sm group-hover:scale-110 transition-transform duration-300"></i>
              Confirm Booking
            </button>
            
            <p className="text-center text-xs text-stone-400 mt-4">
              By confirming, you agree to our <span className="text-rose-400">Terms of Service</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}