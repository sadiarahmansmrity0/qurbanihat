'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '../../src/hooks/useAuth';
import logo from '../../src/assets/logo.svg';

export default function Register() {
  const router = useRouter();
  const { signup, updateUserProfile, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      toast.success('✨ Successfully registered with Google! ✨');
      router.push('/');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Create user account
      const userCredential = await signup(formData.email, formData.password);
      
      // Update profile with display name
      if (formData.displayName) {
        await updateUserProfile(formData.displayName, '');
      }
      
      toast.success('✨ Account created successfully! ✨');
      router.push('/');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50/30 min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-3xl shadow-glow p-8 border border-pink-100">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <img src={logo.src || logo} alt="QurbaniHat Logo" className="h-16 w-auto mx-auto mb-3" />
            </Link>
            <p className="text-stone-400 mt-2 font-light">Join our family! ✨</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl mb-6 text-sm">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <i className="fas fa-user text-rose-400 text-[10px]"></i>
                Full Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-pink-50/30 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 text-stone-700 placeholder:text-stone-300"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <i className="fas fa-envelope text-rose-400 text-[10px]"></i>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-pink-50/30 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 text-stone-700 placeholder:text-stone-300"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <i className="fas fa-lock text-rose-400 text-[10px]"></i>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-pink-50/30 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 text-stone-700 placeholder:text-stone-300"
                placeholder="••••••••"
              />
              <p className="text-xs text-stone-400 mt-1">At least 6 characters</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <i className="fas fa-check-circle text-rose-400 text-[10px]"></i>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-pink-50/30 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 text-stone-700 placeholder:text-stone-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 font-semibold text-lg mt-6"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Creating account...
                </>
              ) : (
                <>
                  <i className="fas fa-heart mr-2"></i>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
            <span className="text-stone-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
          </div>

          {/* Social Signup */}
          <button 
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full border-2 border-pink-200 py-3 rounded-xl font-semibold text-stone-600 hover:border-rose-300 hover:text-rose-500 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fab fa-google mr-2"></i>
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-stone-500 mt-8 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-rose-500 font-semibold hover:text-rose-600 transition-colors">
              Login here
            </Link>
          </p>
        </div>

        {/* Back Home Link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-stone-400 hover:text-rose-500 transition-colors inline-flex items-center gap-2 text-sm group">
            <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform duration-300"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}