'use client';

import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { AuthContext } from './authContextInstance';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const googleProvider = new GoogleAuthProvider();

  // Create new user account
  const signup = async (email, password) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (displayName, photoURL) => {
    try {
      setError(null);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName,
          photoURL,
        });
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Update user email
  const updateUserEmail = async (newEmail) => {
    try {
      setError(null);
      if (auth.currentUser) {
        await updateEmail(auth.currentUser, newEmail);
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Update user password
  const updateUserPassword = async (newPassword) => {
    try {
      setError(null);
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authValue = {
    user,
    loading,
    error,
    signup,
    signInWithGoogle,
    login,
    logout,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    auth,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}