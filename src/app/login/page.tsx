'use client'

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import API from '@/shared/api';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isReqestAccount, setIsRequestAccount] = useState(false);

  function switchMode() {
    setIsRequestAccount(!isReqestAccount);
  }

  // ! Effect to handle the initial state of the form
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    await API.post('/user', data) // Updated endpoint
      .then((res: { data: any; }) => {
        console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

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
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 w-[400px] animate-fade-in flex flex-col gap-12">
          <h2 className="text-3xl font-bold text-white text-center tracking-wide">
            Welcome to <br /> TeamHub
          </h2>
          <form className="flex flex-col gap-8" onSubmit={(e) => { handleSubmit(e) }}>
            <div className="relative group">
              <label htmlFor="email" className="block text-sm text-white font-medium mb-1">
                Email
              </label>
              <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-500 bg-black/10 ring-0 ring-white/10 focus:bg-black/30 focus:ring-2 focus:ring-white/30" />
            </div>

            <div className="relative">
              <label htmlFor="password" className={`block text-sm text-white font-semibold mb-1 transition-all duration-500 ease-in-out ${isReqestAccount ? 'opacity-0' : 'opacity-100'}`}>
                Password
              </label>
              <label className={`absolute top-0 left-0 block text-sm text-white font-semibold mb-1 transition-all duration-500 ease-in-out   ${!isReqestAccount ? 'opacity-0 ' : 'opacity-100'}`}>
                Verification code
              </label>
              <input type={showPassword ? "text" : "password"} id={isReqestAccount ? "verificationCode" : "password"} name={isReqestAccount ? "verificationCode" : "password"} placeholder={isReqestAccount ? "Enter your verification code" : "Enter your password"}
                className={`w-full px-4 py-3 pr-12 rounded-xl focus:outline-none transform transition-all duration-500 ${isReqestAccount ? 'scale-105 shadow-sm z-10 bg-black/30 ring-2 ring-pink-500 delay-150' : 'scale-100 shadow-none z-0 bg-black/10 ring-0 ring-white/10 focus:bg-black/30 focus:ring-2 focus:ring-white/30'}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-[5%] top-[50%] text-white/70 hover:text-white transition-all duration-500 ${isReqestAccount ? 'opacity-0' : 'opacity-100'} `} aria-label=" Toggle password visibility">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button type="submit" className="w-full py-2 rounded-lg shadow-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold tracking-wide hover:shadow-lg transition duration-500 ease-in-out bg-blend-soft-light">
              Sign In
            </button>
          </form>
          <div className="flex flex-row gap-1 text-sm text-white/70 justify-center items-center">
            <span> Don’t have an account?</span>
            <button className="text-white underline hover:text-violet-300 font-semibold" onClick={switchMode}>Request account</button>
          </div>
        </div>
      </div >
    </div >
  );
}