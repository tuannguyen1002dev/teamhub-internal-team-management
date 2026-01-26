'use client'

import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema } from "../../domain/schemas/login.schema"
import { useLogin } from "../hooks/useLogin"
import { LoginPayload, formDefaultValues } from "../../domain/types"

import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from "@/contexts/AuthProvider"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { submit } = useLogin()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace(callbackUrl)
    }
  }, [isAuthenticated, isLoading, router, callbackUrl])

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginPayload) {
    try {
      await submit(data)
      router.push(callbackUrl)
    } catch (error: any) {
      setError("email", { type: "manual", message: error.message })
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center font-sans">
      {/* Background layer with subtle animation */}
      <div
        className="absolute inset-0 opacity-50 bg-[url('/login-ads.jpg')] bg-cover bg-center scale-105 transition-transform duration-[10000ms] ease-linear hover:scale-110"
        style={{ filter: 'brightness(0.3) blur(2px)' }}
      />

      {/* Glassmorphic Container */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fade-up">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 mb-2">
              <span className="text-white text-2xl font-bold tracking-tighter">TH</span>
            </div>
            <h3 className="text-3xl font-bold text-white tracking-tight">Welcome back</h3>
            <p className="text-slate-400 text-sm">Enter your credentials to access TeamHub</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">
                Corporate Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="relative group">
                    <input
                      {...field}
                      type="email"
                      id="email"
                      autoFocus
                      placeholder="name@company.com"
                      className={`w-full px-5 py-3.5 rounded-2xl outline-none transition-all duration-300 bg-white/5 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-violet-500/50 focus:bg-white/[0.08]'} text-white placeholder:text-slate-500`}
                    />
                  </div>
                )}
              />
              {errors.email && (
                <span className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1 animate-shake">
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center ml-1">
                <label htmlFor="password" className="text-sm font-medium text-slate-300">
                  Security Password
                </label>
                <a className="text-xs text-violet-400 hover:text-violet-300 transition-colors cursor-pointer font-medium">Forgot?</a>
              </div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="relative group">
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••"
                      className={`w-full px-5 py-3.5 pr-12 rounded-2xl outline-none transition-all duration-300 bg-white/5 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-violet-500/50 focus:bg-white/[0.08]'} text-white placeholder:text-slate-500`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
                    </button>
                  </div>
                )}
              />
              {errors.password && (
                <span className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1 animate-shake">
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-600/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              Sign in to Dashboard
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-slate-500 font-medium">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-slate-300 text-sm font-medium">
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-slate-300 text-sm font-medium">
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
