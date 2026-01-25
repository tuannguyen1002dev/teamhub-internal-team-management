'use client'

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
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
    <div className="relative h-screen w-full overflow-hidden bg-blend-soft-light">
      {/* Login Form Container */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 w-[400px] animate-fade-in flex flex-col gap-8">
          <h3 className="text-3xl font-bold text-black text-center tracking-wide flex flex-col gap-3 select-none">
            Welcome
          </h3>
          <form className="flex flex-col gap-8 pb-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative group">
              <label htmlFor="email" className="block text-sm text-white font-medium mb-1 select">
                Email
              </label>
              <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-500 bg-black/20 ring-0 ring-white/10 focus:bg-black/50 focus:ring-1 focus:ring-white/30" />
            </div>
            <div className="relative">
              <label htmlFor="password" className="lock text-sm text-white font-semibold mb-1 transition-all duration-500 ease-in-out select-none">
                Password
              </label>
              <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password"
                className="w-full px-4 py-3 pr-12 rounded-xl focus:outline-none transform transition-all duration-500 bg-black/20 ring-0 ring-white/10 focus:bg-black/50 focus:ring-1 focus:ring-white/30" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[5%] top-[55%] text-white/70 hover:text-white transition-all duration-500" aria-label=" Toggle password visibility">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button type="submit" className={`relative w-full py-2 rounded-lg shadow-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold hover:shadow-lg transition duration-500 ease-in-out bg-blend-soft-light`}>
              Sign in
            </button>
          </form>
          {/* continue with goolge/facebook */}
          <span className=" flex flex-row gap-3 justify-center text-sm text-white/70 select-none">
            Continue with
            <a className="font-bold italic underline cursor-pointer">Google</a>/<a className="font-bold italic underline cursor-pointer">Facebook</a>
          </span>
        </div>
      </div >
    </div >
  )
}
