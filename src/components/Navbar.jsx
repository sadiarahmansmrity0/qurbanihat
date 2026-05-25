'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/logo.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch {
      toast.error('Logout failed');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Animals', path: '/all-animals' },
  ];

  return (
    <nav className="bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 shadow-soft sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center bg-transparent group">
          <div className="relative">
            <img src={logo.src || logo} alt="QurbaniHat Logo" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-300 group-hover:w-full"></div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-rose-500' 
                    : 'text-stone-600 hover:text-rose-400'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                href="/profile" 
                title={user.displayName || 'Profile'}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-rose-400">
                    <i className="fas fa-user text-xl"></i>
                  </div>
                )}
              </Link>
              <button
                onClick={handleLogout}
                title="Logout"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-rose-100 text-rose-500 hover:from-pink-500 hover:to-rose-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <i className="fas fa-sign-out-alt text-lg"></i>
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-stone-600 font-medium hover:text-rose-400 transition-all duration-300 relative group">
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/register" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-rose-400 text-2xl focus:outline-none w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 transition-all duration-300"
        >
          <i className={`fas fa-${isOpen ? 'times' : 'bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50 border-t border-pink-100 py-6 px-4 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={toggleMenu}
                  className={`text-lg font-medium transition-all duration-300 ${
                    isActive ? 'text-rose-500' : 'text-stone-600 hover:text-rose-400'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="border-t border-pink-100 pt-5 mt-2 flex flex-col gap-4">
              {user ? (
                <>
                  <Link 
                    href="/profile" 
                    onClick={toggleMenu} 
                    className="flex items-center gap-3 text-stone-700 group"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-200 group-hover:border-pink-400 transition-all">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-rose-400">
                          <i className="fas fa-user"></i>
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-rose-600">{user.displayName || 'Profile'}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium py-3 px-6 hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={toggleMenu} className="text-stone-600 font-medium py-2 text-center hover:text-rose-400 transition-all duration-300">
                    Login
                  </Link>
                  <Link href="/register" onClick={toggleMenu} className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium py-3 px-6 hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md text-center">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}