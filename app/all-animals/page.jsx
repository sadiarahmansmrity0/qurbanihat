'use client';

import { useState, useEffect } from 'react';
import AnimalCard from '../../src/components/AnimalCard';
import { AnimalCardSkeleton } from '../../src/components/Skeleton';

export default function AllAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    setLoading(true);
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => {
        setAnimals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading animals:', err);
        setLoading(false);
      });
  }, []);

  const filteredAnimals = filterType === 'All' 
    ? [...animals] 
    : animals.filter(animal => animal.type === filterType);

  if (sortBy === 'low-to-high') {
    filteredAnimals.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high-to-low') {
    filteredAnimals.sort((a, b) => b.price - a.price);
  }

  const animalTypes = ['All', ...new Set(animals.map(a => a.type))];

  return (
    <main className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50/30 min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-white via-pink-50/50 to-rose-50/30 py-16 md:py-24 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find Your <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Qurbani</span> Animal
          </h1>
          <p className="text-stone-400 max-w-2xl mx-auto text-lg font-light">
            Browse our wide selection of healthy, verified livestock. Use the filters below to find the perfect animal for your Qurbani.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter and Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-pink-100 pb-8">
          <div className="flex flex-col gap-2">
            <div className="text-stone-700 font-bold text-lg flex items-center gap-2">
              <i className="fas fa-paw text-rose-400 text-sm"></i>
              Showing {filteredAnimals.length} Animals
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-stone-400 text-sm font-medium flex items-center gap-1">
                <i className="fas fa-arrow-up-wide-short text-[10px]"></i>
                Sort by:
              </label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white text-stone-600 px-4 py-1.5 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-rose-300/50 border border-pink-100 cursor-pointer hover:border-rose-200 transition-all"
              >
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-3 flex-wrap justify-center">
            {animalTypes.map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  filterType === type
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-rose-200/50'
                    : 'bg-white text-stone-500 hover:text-rose-500 border border-pink-100 hover:border-rose-200 hover:shadow-sm'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Animals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, idx) => <AnimalCardSkeleton key={idx} />)
            : filteredAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
        </div>

        {/* Empty State */}
        {filteredAnimals.length === 0 && (
          <div className="text-center py-16 bg-white/50 rounded-3xl mt-12 border-2 border-dashed border-pink-200 backdrop-blur-sm">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-heart text-rose-400 text-2xl"></i>
            </div>
            <p className="text-stone-400 text-xl font-light">No animals found in this category.</p>
            <button 
              onClick={() => setFilterType('All')}
              className="mt-4 text-rose-500 font-semibold hover:text-rose-600 transition-colors duration-300 inline-flex items-center gap-2 group"
            >
              <span>Clear all filters</span>
              <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}