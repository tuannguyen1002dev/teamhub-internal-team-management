
import react, { use } from 'react'
import { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { usePhoneRegions } from '../hooks/useValidateToken';
import { Eye, EyeOff, MessageSquareWarning, ChevronDown } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { setupAccountSchema, SetupAccountFormValues } from '../schemas/setup-account.schema';
import { setupAccountDefualtValues } from '../types';

export default function SetupAccountForm({ validatedEmail }: { validatedEmail: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const { regions, loading: loadingRegions } = usePhoneRegions()
  const [selectedRegion, setSelectedRegion] = useState<any>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (regions.length > 0 && !selectedRegion) {
      const defaultRegion = regions.find(r => r.iso2 === 'VN') || regions[0]
      setSelectedRegion(defaultRegion)
    }
  }, [regions])


  const {
    control,
    setError,
    watch,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<SetupAccountFormValues>({
    defaultValues: {
      ...setupAccountDefualtValues,
      email: validatedEmail,
    },
    mode: 'onChange',
    resolver: zodResolver(setupAccountSchema)
  })

  useEffect(() => {
    if (watch('password') && watch('confirmPassword') !== "")
      trigger('confirmPassword')
  }, [watch('password')])

  function onSubmit(event: any) {
    console.log("DATA SUBMIT: ", event);
  }

  const classNameErrorContainer = "relative bg-black/20 backdrop:backdrop-blur-2xl rounded-md transition-all duration-500 ease-in-out";
  const classNameErrorText = "transition-all duration-500 ease-in-out text-red-500 text-sm absolute transform translate-x-[-50%] translate-y-[-50%] left-[55%] top-[50%] w-full";

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
            data-success={field.value !== "" && !errors.email ? "false" : "false"} />} />
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <div className="relative">
            <input {...field} placeholder='username'
              className="input-field-md-primary"
              data-error={errors.username ? "true" : "false"}
              data-success={field.value && !errors.username ? "true" : "false"} />
            <div className={`error-container ${errors.username ? ' h-10 p-3 opacity-100 mt-3' : 'h-0 p-0 opacity-0 mt-0'}`}>
              <span className={`error-text ${errors.username ? ' opacity-100' : 'opacity-0 '} `}>{errors.username?.message}</span>
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
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute transform translate-x-[-50%] translate-y-[-50%] right-[5%] top-[50%] text-white/70 hover:text-white transition-all duration-500" aria-label=" Toggle password visibility">
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
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute transform translate-x-[-50%] translate-y-[-50%] right-[5%] top-[50%] text-white/70 hover:text-white transition-all duration-500" aria-label=" Toggle password visibility">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>} />
        {/* ver 1 */}
        <div className="error-container">
          <div className={`relative flex flex-col gap-1 justify-center items-start error-container
              ${errors.password && !errors.confirmPassword ? 'h-10 opacity-100 p-3'
              : !errors.password && errors.confirmPassword ? 'h-10 opacity-100 p-3'
                : errors.password && errors.confirmPassword ? 'h-16 opacity-100 p-3'
                  : 'h-0 opacity-0 p-0'}`}>
            <span className={`error-text ${errors.password && !errors.confirmPassword ? 'top-[50%]' : 'top-[35%]'}`}>
              {errors.password && errors.password?.message}
            </span>
            <span className={`error-text ${!errors.password && errors.confirmPassword ? 'top-[50%]' : 'top-[65%]'}`}>
              {errors.confirmPassword && errors.confirmPassword?.message}
            </span>
          </div>
        </div>
      </div>
      <div className="option-info-container flex flex-col gap-3">
        <Controller
          name="fullname"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <div className="relative">
            <input {...field} placeholder='fullname (optional)'
              className="input-field-md-primary"
              data-error={errors.fullname ? "true" : "false"}
              data-success={field.value && !errors.fullname ? "true" : "false"} />
            <div className={`error-container ${errors.fullname ? ' h-10 p-3 opacity-100 mt-3' : 'h-0 p-0 opacity-0 mt-0'}`}>
              <span className={`error-text ${errors.fullname ? ' opacity-100' : 'opacity-0 '}`}>{errors.fullname?.message}</span>
            </div>
          </div>} />
        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <div className='relative'>
                <div className="flex gap-2 items-center">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="input-field-md-primary w-[100px] flex items-center justify-between px-3"
                    >
                      <span className='text-xl'>{selectedRegion?.flag}</span>
                      <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute top-[110%] left-0 w-[300px] max-h-[300px] overflow-y-auto bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg p-2 z-50 flex flex-col gap-1 shadow-xl animate-dropdown-open custom-scrollbar">
                        {loadingRegions ? (
                          <div className="p-2 text-white/50 text-center text-sm">Loading regions...</div>
                        ) : regions.map((region: any, index: number) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setSelectedRegion(region)
                              setIsDropdownOpen(false)
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md transition-colors text-left"
                          >
                            <span className="text-xl w-8">{region.flag}</span>
                            <span className="text-white/70 text-sm flex-1">{region.country}</span>
                            <span className="text-white/50 text-xs">{region.dialCode}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      {...field}
                      placeholder='phone number (optional)'
                      className="input-field-md-primary w-full"
                      data-error={errors.phone ? "true" : "false"}
                      data-success={field.value && !errors.phone ? "true" : "false"}
                    />
                  </div>
                </div>
                <div className={`error-container ${errors.phone ? ' h-10 p-3 opacity-100 mt-3' : 'h-0 p-0 opacity-0 mt-0'}`}>
                  <span className={`error-text ${errors.phone ? ' opacity-100' : 'opacity-0 '}`}>{errors.phone?.message}</span>
                </div>
              </div>
            )
          }}
        />
      </div>
      <button className="submit-btn-primary col-span-2" type="submit">
        Setup Account
      </button>
    </form >
  )
}