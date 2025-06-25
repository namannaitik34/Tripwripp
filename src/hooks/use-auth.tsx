'use client';

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, isConfigured } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  isFirebaseConfigured: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isFirebaseConfigured: false });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If firebase is not configured, don't try to listen for auth state changes.
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading && isConfigured) {
      return (
          <div className="w-full h-screen flex items-center justify-center">
              <Skeleton className="w-24 h-24 rounded-lg" />
          </div>
      )
  }

  return <AuthContext.Provider value={{ user, loading, isFirebaseConfigured: isConfigured }}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
