'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import BookingModal from './BookingModal';

export default function AnimalCard({ animal }) {
  const { user } = useAuth();
  const router = useRouter();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push('/login');
      return;
    }
    setShowBookingModal(true);
  };

  return (
    <>
      {showBookingModal && (
        <BookingModal 
          animal={animal} 
          user={user} 
          onClose={() => setShowBookingModal(false)} 
        />
      )}
      <Link 
        href={`/animal/${animal.id}`}
        className="group bg-white rounded-3xl shadow-soft overflow-hidden hover:shadow-glow transition-all duration-500 border border-pink-100 hover:border-rose-200 hover:-translate-y-2 flex flex-col h-full cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-pink-50 to-rose-50">
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1542462262-97b9c2671a9c?q=80&w=1000';
            }}
          />
          
          {/* Soft Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Status Badges */}
          <div className="absolute top-4 right-4">
            <span className={`px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-soft border ${
              animal.category.includes('Large') 
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-300/30' 
                : 'bg-gradient-to-r from-amber-400 to-orange-400 text-white border-amber-300/30'
            }`}>
              {animal.category}
            </span>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-pink-50/30">
          <h3 className="text-xl font-semibold text-stone-800 mb-3 group-hover:text-rose-500 transition-colors duration-300 line-clamp-1">
            {animal.name}
          </h3>

          {/* Attributes List */}
          <div className="space-y-3 mb-5 text-sm">
            <div className="flex justify-between items-center pb-1 border-b border-pink-50">
              <span className="text-stone-400 font-medium text-xs uppercase tracking-wider">Type</span>
              <span className="text-stone-700 font-semibold">{animal.type}</span>
            </div>
            <div className="flex justify-between items-center pb-1 border-b border-pink-50">
              <span className="text-stone-400 font-medium text-xs uppercase tracking-wider">Breed</span>
              <span className="text-stone-700 font-semibold">{animal.breed}</span>
            </div>
            <div className="flex justify-between items-center pb-1 border-b border-pink-50">
              <span className="text-stone-400 font-medium text-xs uppercase tracking-wider">Weight</span>
              <span className="text-stone-700 font-semibold">{animal.weight} kg</span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-rose-400 text-[10px]"></i>
              </div>
              <span className="text-xs text-stone-500">{animal.location}</span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-auto pt-4 border-t border-pink-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-stone-300 uppercase font-semibold tracking-widest">Starting from</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-rose-400 font-medium">৳</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    {animal.price.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-rose-400 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                <span>View Details</span>
                <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
            </div>
            
            <button
              onClick={handleBookClick}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-rose-200/50 active:scale-95 flex items-center justify-center gap-2 group/btn"
            >
              <i className="fas fa-heart text-[12px] group-hover/btn:scale-110 transition-transform duration-300"></i>
              <span>Book Now</span>
              <i className="fas fa-shopping-bag text-[10px] opacity-70"></i>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-3 right-3 w-20 h-20 bg-gradient-to-tl from-rose-100/30 to-transparent rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </Link>
    </>
  );
}