
import react from 'react'
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Eye, EyeOff, MessageSquareWarning } from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup'
import { setupAccountSchema } from '../schemas/setup-account.schema';
import { AccountDetailProps } from "@/shared/contracts/account/account-details.contract"
import { setupAccountDefualtValues } from "../type"

export default function SetupAccountForm({ validatedEmail }: { validatedEmail: string }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<AccountDetailProps>({
    defaultValues: { ...setupAccountDefualtValues, email: validatedEmail },
    mode: 'onChange',
    resolver: yupResolver(setupAccountSchema)
  })

  function onSubmit(event: any) {
    console.log("DATA SUBMIT: ", event);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 w-full flex flex-col gap-12">
      <div className="main-info-container flex flex-col gap-3">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input disabled {...field} placeholder='email address'
            className="input-field-md-primary bg-white/30 cursor-not-allowed"
            data-error={errors.email ? "true" : "false"}
            data-success={field.value !== "" && !errors.email ? "false" : "false"}
          />} />
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <div className="relative">
            <input {...field} placeholder='username'
              className="input-field-md-primary"
              data-error={errors.username ? "true" : "false"}
              data-success={field.value && !errors.username ? "true" : "false"}
            />
            {/* <span className={`absolute right-[5%] top-[30%] ${errors.username ? 'display-none' : 'display-none'}`}>{`${errors.username?.type ? errors.username.message : ''}`}</span> */}
            <div className={`${errors.username ?  'h-10' : 'h-0'} absolute bg-black/20 backdrop:backdrop-blur-2xl mt-3 p-3 rounded-md text-red-500 text-sm flex items-center gap-1 transition-all duration-500 overflow-hidden`}>
              {errors.username?.message}
            </div>
          </div>} />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <div className="relative">
            <input {...field} type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password"
              className="input-field-md-primary"
              data-error={errors.password ? "true" : "false"}
              data-success={field.value && !errors.password ? "true" : "false"} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[5%] top-[30%] text-white/70 hover:text-white transition-all duration-500" aria-label=" Toggle password visibility">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>} />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <div className="relative">
            <input {...field} type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password"
              className="input-field-md-primary"
              data-error={errors.confirmPassword ? "true" : "false"}
              data-success={field.value && !errors.confirmPassword ? "true" : "false"} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[5%] top-[30%] text-white/70 hover:text-white transition-all duration-500" aria-label=" Toggle password visibility">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>} />
      </div>
      <div className="option-info-container flex flex-col gap-3">
        <Controller
          name="fullname"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input {...field} placeholder='fullname (optional)'
            className="input-field-md-primary"
            data-error={errors.fullname ? "true" : "false"}
            data-success={field.value && !errors.fullname ? "true" : "false"}
          />} />
        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input {...field} placeholder='phone number (optional)'
            className="input-field-md-primary"
            data-error={errors.phone ? "true" : "false"}
            data-success={field.value && !errors.phone ? "true" : "false"}
          />} />
      </div>
      <button className="submit-btn-primary col-span-2" type="submit">
        Setup Account
      </button>
    </form >
  )
}