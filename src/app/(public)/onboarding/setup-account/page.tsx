'use client';

import react from 'react'
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Api from '@/shared/utils/api';
import { useForm, Controller } from 'react-hook-form';
import { Eye, EyeOff, MessageSquareWarning } from 'lucide-react';
import { useAuth } from "@/contexts/AuthProvider";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// email       String         
//   fullname    String?
//   username    String?
//   dateOfBirth DateTime?
//   phoneNumber String?
//   address     String?

const defaultValues = {
  email: 'admin@example.com',
  fullname: '',
  username: '',
  dateOfBirth: '',
  phoneNumber: '',
  address: '',
  password: '',
  confirmPassword: ''
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  fullname: yup.string().matches(/^[\p{L}][\p{L}'\-\. ]{1,48}[\p{L}]$/u, "this is not an actual name for a person"),
  username: yup.string().required().matches(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "incorrect username"),
  dateOfBirth: yup.string(),
  phoneNumber: yup.string(),
  address: yup.string(),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password must contain atlest one uppercase, one number and one special character"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Please re-enter the password"),
})

export default function SetupAccount() {

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  function onSubmit(event: any) {
    console.log("DATA SUBMIT: ", event);
  }

  return (
    <div className="ground-page-container">
      <div className="ground-page-layout">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 flex flex-row gap-3 w-[70%] rounded-xl">
          <div className="ads-panel w-[90%] shadow-[0px_0px_15px_-5px_rgba(0,0,0,0.5)] bg-white rounded-tl-xl rounded-bl-xl text-black p-0">
            <img src="/login-ads.jpg" className="rounded-tl-xl rounded-bl-xl" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 w-full flex flex-col gap-12">
            <div className="main-info-container flex flex-col gap-3">
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <input disabled {...field} placeholder='email address'
                  className="input-field-md-primary bg-white/30 cursor-not-allowed"
                  data-error={errors.email ? "true" : "false"}
                  data-success={defaultValues.email !== "" && !errors.email ? "false" : "false"}
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
                  <button type="button" onClick={() => console.log("tuan")} className="absolute right-[5%] top-[30%] text-white/70 hover:text-white transition-all duration-500 z-10" aria-label=" Toggle password visibility">
                    <MessageSquareWarning size={16} color="orange" />
                  </button>
                  <span className={`absolute right-[5%] top-[30%] p-1 bg-orange-400 ${errors.username ? 'display-flex' : 'display-none'}`}>{`${errors.username?.type ? errors.username.message : ''}`}</span>
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
                name="phoneNumber"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <input {...field} placeholder='phone number (optional)'
                  className="input-field-md-primary"
                  data-error={errors.phoneNumber ? "true" : "false"}
                  data-success={field.value && !errors.phoneNumber ? "true" : "false"}
                />} />
            </div>
            <button className="submit-btn-primary col-span-2" type="submit">
              Setup Account
            </button>
          </form>
        </div>
      </div>
    </div >
  )
}


