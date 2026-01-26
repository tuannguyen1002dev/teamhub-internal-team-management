'use client'

import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Spinner from '@/shared/ui/Spinner';

export default function HomePage() {
  const auth = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoading) {
      if (auth.isAuthenticated) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [auth.isLoading, auth.isAuthenticated, router]);

  return <Spinner />;
}




