import React from "react";
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Welcome to TeamHub</h1>
      <p className="mb-8 text-lg text-gray-700">
        Your internal team management solution.
      </p>
      <div className="flex space-x-4">
        <button onClick={() => router.push('/dashboard')}
          className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>
    </div>
  );
}