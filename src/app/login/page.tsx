'use client'

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-blend-soft-light">
      {/* Animated Wavy Color Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path fill="url(#waveGradient)" fillOpacity="1">
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="M0,160 C480,100 960,220 1440,160 L1440,320 L0,320 Z;M0,180 C480,220 960,100 1440,180 L1440,320 L0,320 Z;M0,160 C480,100 960,220 1440,160 L1440,320 L0,320 Z"
              keyTimes="0; 0.5; 1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
            />
          </path>
        </svg>
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10 w-[400px] animate-fade-in">
          <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
            Welcome to TeamHub
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm text-white font-medium mb-1">
                Username
              </label>
              <input type="text" id="username" placeholder="Enter your username" className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm text-white font-medium mb-1">
                Password
              </label>
              <input type={showPassword ? "text" : "password"} id="password" placeholder="Enter your password" className="w-full px-4 py-2 pr-12 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-violet-400" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-white/70 hover:text-white" aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button type="submit" className="w-full py-2 rounded-lg shadow-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold tracking-wide hover:shadow-lg transition duration-500 ease-in-out bg-blend-soft-light">
              Sign In
            </button>
          </form>
          <p className="text-sm text-white/70 text-center mt-6">
            Don’t have an account? <a href="#" className="text-white underline hover:text-violet-300">Request account</a>
          </p>
        </div>
      </div>
    </div>
  );
}