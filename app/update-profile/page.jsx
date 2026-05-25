'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '../../src/hooks/useAuth';
import PrivateRoute from '../../src/components/PrivateRoute';

export default function UpdateProfilePage() {
  return (
    <PrivateRoute>
      <UpdateProfile />
    </PrivateRoute>
  );
}

function UpdateProfile() {
  const { user, updateUserProfile } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateUserProfile(formData.displayName, formData.photoURL);
      toast.success('✨ Profile updated successfully! ✨');
      router.push('/profile');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50/30 min-h-screen py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-glow p-8 border border-pink-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-user-edit text-rose-400 text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-800 to-rose-600 bg-clip-text text-transparent">
              Update Profile
            </h1>
            <p className="text-stone-400 text-sm mt-2">Make your profile shine ✨</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl mb-6 text-sm">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}

          {/* Success Message for current profile info */}
          {user?.displayName && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 text-green-600 px-4 py-3 rounded-2xl mb-6 text-sm">
              <i className="fas fa-check-circle mr-2"></i>
              Current name: <span className="font-semibold">{user.displayName}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <i className="fas fa-user text-rose-400 text-[10px]"></i>
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-pink-50/30 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 text-stone-700 placeholder:text-stone-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <i className="fas fa-image text-rose-400 text-[10px]"></i>
                Photo URL
              </label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-pink-50/30 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 text-stone-700 placeholder:text-stone-300"
                placeholder="https://example.com/photo.jpg"
              />
              <p className="text-xs text-stone-400 mt-1">Enter a valid image URL for your profile picture</p>
            </div>

            {/* Preview Section */}
            {(formData.photoURL || formData.displayName) && (
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-100">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <i className="fas fa-eye text-rose-400 text-[10px]"></i>
                  Preview
                </p>
                <div className="flex items-center gap-4">
                  {formData.photoURL ? (
                    <img 
                      src={formData.photoURL} 
                      alt="Preview" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-rose-200"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/48?text=❌';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                      <i className="fas fa-user text-rose-400"></i>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-stone-700">
                      {formData.displayName || 'Your Name'}
                    </p>
                    <p className="text-xs text-stone-400">Preview of your profile</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 font-semibold text-lg"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Updating...
                </>
              ) : (
                <>
                  <i className="fas fa-heart mr-2"></i>
                  Save Changes
                </>
              )}
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full py-3 rounded-xl font-semibold text-stone-500 hover:text-rose-500 transition-colors duration-300 flex items-center justify-center gap-2 group"
            >
              <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform duration-300"></i>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}