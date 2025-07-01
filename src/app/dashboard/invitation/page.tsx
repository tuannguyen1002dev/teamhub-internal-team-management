'use client'

import Api from "@/shared/api";
import React, { JSX, useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Copy } from "lucide-react";

type Inputs = {
  email: string
}

export default function InvitationPanel() {

  const invitationTokenRef = useRef<HTMLInputElement>(null);


  const schema = yup.object().shape({
    email: yup.string().required('please enter your email').email('please enter a valid email address').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 'please enter a valid email address')
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { email: "" },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const [apiPostMode, setApiPostMode] = useState<boolean>(false);
  const [invCodeCheck, setInvCodeCheck] = useState<string | null>("");
  const [invitaionCodeArray, setInvitaionCodeArray] = useState<any[]>([]);
  const [recentGeneratedToken, setRecentGeneratedToken] = useState<string | null>(null);

  async function CopyInvCodeToClipboard(targetValue: string) {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText === targetValue) {
      } else {
        await navigator.clipboard.writeText(targetValue);
        setInvCodeCheck(targetValue);
      }
    } catch (error) {
      console.error("Failed to read or write clipboard:", error);
    }
  }

  async function fetchInvitationCodes() {
    try {
      const response = await Api.get('invitation-token');
      setInvitaionCodeArray(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching invitation codes:", error);
    }
  }

  useEffect(() => {
    fetchInvitationCodes()
  }, []);


  // ** utils functions
  function formatDateTime(dateInput: string | Date): string {
    const date = new Date(dateInput);

    const day = String(date.getDate()).padStart(2, '0');         // DD
    const month = String(date.getMonth() + 1).padStart(2, '0');  // MM (0-based)
    const year = date.getFullYear();                             // YYYY

    const hours = String(date.getHours()).padStart(2, '0');      // hh
    const minutes = String(date.getMinutes()).padStart(2, '0');  // mm
    const seconds = String(date.getSeconds()).padStart(2, '0');  // ss

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  function onSubmit(data: Inputs) {
    console.log(data)
    // Api.post('/invitation-token', { email: data.email }).then((res: { data: any; }) => {
    //   console.log("Generated token:", res.data.token);
    //   res.data.token && navigator.clipboard.writeText(res.data.token);
    //   setRecentGeneratedToken(res.data.token);
    //   fetchInvitationCodes();
    // }).catch((err: any) => {
    //   console.error("Error generating code:", err);
    //   if (err.response && err.response.data && err.response.data.message) {
    //     setError("email", { type: "manual", message: err.response.data.message });
    //   } else {
    //     setError("email", { type: "manual", message: "An unexpected error occurred." });
    //   }
    // });
  }

  function withoutEmailTokenGen

  return (
    <div className="flex flex-col gap-3 p-3">
      {/* <h1 className="text-2xl font-bold mb-4">Code List</h1> */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-950 rounded-4xl border border-gray-800">
          <thead>
            <tr className="text-start bg-gray-800 text-white">
              <th className="px-4 py-2 text-start">Access token</th>
              <th className="px-4 py-2 border-l-1 border-gray-950 text-start">email</th>
              <th className="px-4 py-2 border-l-1 border-gray-950 text-center">Status</th>
              <th className="px-4 py-2 border-l-1 border-gray-950 text-center">Created time</th>
              <th className="px-4 py-2 border-l-1 border-gray-950 text-center">Expires time</th>
              <th className="px-4 py-2 border-l-1 border-gray-950 text-start">Created by</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(invitaionCodeArray) && invitaionCodeArray.map(items => (
              <tr key={items.id} className="hover:bg-gray-900 relative group overflow-visible h-15">
                <td className="pl-4 py-2 flex flex-row gap-3 justify-start items-center h-15" onClick={() => CopyInvCodeToClipboard(items.token)}>
                  <span className="truncate w-50">{items.token}</span>
                  {invCodeCheck == items.code
                    ? <span className="p-1 bg-green-500/20">copied</span>
                    : <span className=" bg-red-500/20"></span>}
                </td>
                <td className="px-4 py-2  border-l-1 border-gray-800 w-150">{items.email}</td>
                <td className="px-4 py-2 border-l-1 border-gray-800 w-40 text-center">{items.isUsed ? 'in active' : 'available'}</td>
                <td className="px-4 py-2 border-l-1 border-gray-800 w-40 text-center">{formatDateTime(items.createdAt)}</td>
                <td className="px-4 py-2 border-l-1 border-gray-800 w-40 text-center">{formatDateTime(items.expiresAt)}</td>
                <td className="px-4 py-2 border-l-1 border-gray-800 w-60">
                  <span>{items.createBy}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row gap-3 mt-4 w-full justify-end items-center">
        <div className={`relative w-100 transition-all duration-500 ease-in-out ${recentGeneratedToken ? 'opacity-100' : 'opacity-0'}`}>
          <input ref={invitationTokenRef} value={recentGeneratedToken ?? ''} type="text" placeholder="access token" className="w-full pr-20 pl-4 py-2 border-gray-300 rounded-4xl border-0 outline-none focus:outline-none" />
          <button className="absolute right-1 top-1 bottom-1 px-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600" onClick={() => CopyInvCodeToClipboard(invitationTokenRef.current?.value ?? '')}>
            <Copy size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }: any) => (
              <div className="relative w-100">
                <input
                  type="email"
                  value={value}
                  onChange={onChange}
                  onBlur={(e) => {
                    onBlur(e)
                    e.currentTarget.value ? setApiPostMode(true) : setApiPostMode(false)
                  }}
                  placeholder="Enter new user email"
                  className={`w-full pr-20 pl-4 py-2 border border-gray-300 rounded-4xl focus:outline-none ${errors.email && value ? `border-none ring-2 ring-red-800` : `border-1 ring-0 ring-red-800`}`} />
                <span className={`absolute top-12 left-1 text-red text-xs text-red-800 transition-all duration-500 ease-in-out ${errors.email && value ? 'opacity-100' : 'opacity-0'}`}>{errors.email && value ? errors.email.message : 'please enter a valid email address'}</span>
                <button className="absolute right-1 top-1 bottom-1 px-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600" type={apiPostMode ? 'submit' : 'button'} onClick={()=>{withoutEmailTokenGen()}}>
                  {value ? 'Assign email' : 'Generate token'}
                </button>
              </div>
            )} />
        </form>
      </div>
    </div>
  );
};