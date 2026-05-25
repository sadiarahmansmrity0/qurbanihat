'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../src/hooks/useAuth';
import BookingModal from '../../../src/components/BookingModal';
import { AnimalDetailSkeleton } from '../../../src/components/Skeleton';

export default function AnimalDetails() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const { user } = useAuth();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(a => a.id === parseInt(id));
        setAnimal(found);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading animal:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50/30 min-h-screen pb-20">
        <div className="bg-gradient-to-b from-white via-pink-50/50 to-rose-50/30 pt-8 pb-4 border-b border-pink-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="w-32 h-8 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl animate-pulse"></div>
          </div>
        </div>
        <AnimalDetailSkeleton />
      </main>
    );
  }

  if (!animal) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50/30">
        <div className="text-center bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-pink-100">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-heart-broken text-rose-400 text-2xl"></i>
          </div>
          <p className="text-2xl mb-4 text-stone-600 font-light">Animal not found</p>
          <button onClick={() => router.back()} className="btn-primary">
            <i className="fas fa-arrow-left mr-2"></i>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleBook = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setShowBookingModal(true);
  };

  return (
    <main className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50/30 min-h-screen pb-20">
      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal 
          animal={animal} 
          user={user} 
          onClose={() => setShowBookingModal(false)} 
        />
      )}
      {/* Breadcrumb / Back Button */}
      <div className="bg-gradient-to-b from-white via-pink-50/50 to-rose-50/30 pt-8 pb-4 border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4">
          <button 
            onClick={() => router.back()} 
            className="group flex items-center gap-2 text-stone-500 hover:text-rose-500 transition-colors duration-300 font-medium"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 group-hover:text-white transition-all duration-300">
              <i className="fas fa-arrow-left text-xs"></i>
            </div>
            Back to Catalog
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Images */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-glow border-4 border-white aspect-[4/3] md:aspect-auto md:h-[400px] lg:h-[500px]">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6">
                <span className={`px-5 py-2 backdrop-blur-md text-white rounded-full text-sm font-semibold shadow-md border border-white/20 ${
                  animal.category.includes('Large') 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500' 
                    : 'bg-gradient-to-r from-amber-400 to-orange-400'
                }`}>
                  {animal.category}
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50/50 to-rose-50/30 p-6 md:p-8 rounded-3xl border border-pink-100 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 flex items-center justify-center">
                  <i className="fas fa-heart text-rose-400 text-sm"></i>
                </div>
                <span className="bg-gradient-to-r from-stone-700 to-stone-500 bg-clip-text text-transparent">About this Animal</span>
              </h3>
              <p className="text-stone-500 leading-relaxed text-lg font-light">
                {animal.description}
              </p>
            </div>
          </div>

          {/* Right Column: Details & Booking */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl text-rose-500 text-xs font-semibold uppercase tracking-wider mb-4 border border-pink-100">
                  <i className="fas fa-check-circle text-rose-400 text-xs"></i>
                  Verified Healthy
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-stone-800 to-rose-600 bg-clip-text text-transparent">
                  {animal.name}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-3 text-stone-400">
                  <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-rose-400 text-[10px]"></i>
                  </div>
                  <span className="text-lg font-light">{animal.location}, Bangladesh</span>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-glow border border-pink-100">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-stone-300 text-sm font-semibold uppercase tracking-widest">Fixed Price</span>
                  <div className="flex items-baseline justify-center md:justify-start gap-2 mt-1">
                    <span className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                      ৳{animal.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100 group hover:bg-white hover:shadow-glow transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 group-hover:text-white transition-all duration-300">
                      <i className="fas fa-weight-hanging text-rose-400 group-hover:text-white"></i>
                    </div>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Weight</p>
                    <p className="text-lg font-bold text-stone-700">{animal.weight} kg</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100 group hover:bg-white hover:shadow-glow transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 group-hover:text-white transition-all duration-300">
                      <i className="fas fa-calendar-alt text-rose-400 group-hover:text-white"></i>
                    </div>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Age</p>
                    <p className="text-lg font-bold text-stone-700">{animal.age} Years</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100 group hover:bg-white hover:shadow-glow transition-all duration-300 col-span-2">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 group-hover:text-white transition-all duration-300">
                      <i className="fas fa-dna text-rose-400 group-hover:text-white"></i>
                    </div>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Breed Type</p>
                    <p className="text-lg font-bold text-stone-700">{animal.breed}</p>
                  </div>
                </div>

                <button
                  onClick={handleBook}
                  className="w-full btn-primary !py-5 text-xl"
                >
                  <i className="fas fa-heart mr-2"></i>
                  {user ? 'Book This Animal' : 'Login to Book'}
                </button>
                
                <p className="text-center text-stone-400 text-xs mt-6 font-medium flex items-center justify-center gap-1">
                  <i className="fas fa-shield-alt text-rose-400 text-[10px]"></i>
                  Secure payment & farm verification guaranteed
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 px-4">
                <div className="text-center group">
                  <div className="text-stone-300 text-2xl mb-2 group-hover:text-rose-400 transition-colors duration-300">
                    <i className="fas fa-vial"></i>
                  </div>
                  <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Tested</p>
                </div>
                <div className="text-center border-x border-pink-100 group">
                  <div className="text-stone-300 text-2xl mb-2 group-hover:text-rose-400 transition-colors duration-300">
                    <i className="fas fa-truck"></i>
                  </div>
                  <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Delivery</p>
                </div>
                <div className="text-center group">
                  <div className="text-stone-300 text-2xl mb-2 group-hover:text-rose-400 transition-colors duration-300">
                    <i className="fas fa-headset"></i>
                  </div>
                  <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}