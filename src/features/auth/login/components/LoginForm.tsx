'use client'

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema } from "../schemas/login.schema"
import { useLogin } from "../hooks/useLogin"
import { LoginPayload, formDefaultValues } from "../types"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { submit } = useLogin()

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
    } catch {
      setError("email", { type: "manual", message: "Email or password is invalid" })
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-indigo-900 via-purple-900 to-black">
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/30 blur-[120px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/30 blur-[120px] mix-blend-screen animate-pulse delay-700" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 transition-all duration-300 hover:shadow-violet-500/20">

          {/* title */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-white/60 text-sm">
              Sign in to continue to TeamHub
            </p>
          </div>

          {/*  Formfields */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white/80 ml-1">
                Email Address
              </label>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <div className="relative group transition-all duration-500 ease-in-out">
                  <span className={` absolute inset-y-0 left-0 pl-3 
                    flex items-center pointer-events-none text-white/40 
                    group-focus-within:text-violet-400
                     transition-all duration-500 ease-in-out`}>
                    <Mail size={18} />
                  </span>
                  <input
                    {...field} placeholder='email' className=" input-field-md-primary 
                    w-full pl-10 pr-4 py-3
                  bg-white/5 border border-white/10 rounded-xl text-white
                  placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 
                    transition-all duration-300 hover:bg-white/10" />
                </div>} />
              <div className={`error-container ${errors.email ? ' h-10 p-3 opacity-100 mt-3' : 'h-0 p-0 opacity-0 mt-0'}`}>
                <span className={`error-text ${errors.email ? ' opacity-100' : 'opacity-0 '} `}>{errors.email?.message}</span>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white/80 ml-1">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <div className="relative group transition-all duration-500 ease-in-out">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-violet-400 transition-colors">
                    <Lock size={18} />
                  </span>
                  <input {...field} type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password"
                    className="input-field-md-primary w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:bg-white/10"
                  // data-error={errors.password ? "true" : "false"}
                  // data-success={field.value && !errors.password ? "true" : "false"}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute transform translate-x-[-50%] translate-y-[-50%] right-[5%] top-[50%] text-white/70 hover:text-white transition-all duration-500" aria-label=" Toggle password visibility">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>} />
              <div className="flex justify-end">
                <a href="#" className="text-xs text-violet-300 hover:text-white transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              // disabled={isSubmitting}
              className="w-full py-3.5 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {true ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Social Links */}
          <div className="mt-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-white/40 backdrop-blur-xl">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button disabled className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {/* Google Icon SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button disabled className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {/* Facebook Icon SVG (approximated for brevity or standard icon) */}
                <svg fill="currentColor" className="w-5 h-5 text-blue-500" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/40 text-xs">
          <p>© {new Date().getFullYear()} TeamHub. All rights reserved.</p>
        </div>
      </div >
    </div >
  )
}
