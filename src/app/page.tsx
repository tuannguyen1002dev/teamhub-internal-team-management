'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function HomePage() {

  const router = useRouter()

  useEffect(() => {
    // localStorage.getItem('authUser') ? null : router.push('/login')
  }, [])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-blend-soft-light">
      <div className="ative z-10 flex items-center justify-center h-full">
        <div className="bg-black/5 backdrop-blur-md w-full h-full animate-fade-in flex flex-col gap-8 justify-center items-center">
          <div id="greeting-placement" className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to
              <span className="opacity-0 ease-in-out animate-pulse transition-opacity duration-300 m-0 p-0"> |</span>
              <span className="text-violet-700 italic">TeamHub</span>
            </h1>
            <p className="text-white/80 text-xl font-bold italic">
              Your internal team management dashboard.
            </p>
          </div>
          <div id="button-placement">
            <button>
              <a href="/login">
                <div className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transition duration-500 ease-in-out">
                  Login
                </div>
              </a>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}