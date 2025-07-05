'use client'

import Api from "@/shared/api";
import React, { JSX, useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Copy } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

// Table import
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'


type Inputs = {
  email: string
}
const notifyBadge = (message: string) => toast.error(message, {
  duration: 5000,
  position: 'bottom-center'
});

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
  const [invitaionCodeArray, setInvitaionCodeArray] = useState<any[]>([]);
  const [recentGeneratedToken, setRecentGeneratedToken] = useState<string | null>(null);

  async function CopyInvCodeToClipboard(targetValue: string | null) {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText === targetValue) {
        toast.success("already copied", {
          duration: 2000,
          position: 'bottom-center',
        });
      } else {
        await navigator.clipboard.writeText(targetValue !== null ? targetValue : '');
        toast.success("Invitation token copied to clipboard", {
          duration: 2000,
          position: 'bottom-center'
        });
      }
    } catch (error) {
      console.error("Failed to read or write clipboard:", error);
      toast.error("Error occured while trying to copy this token", {
        duration: 2000,
        position: 'bottom-center'
      });
    }
  }
  async function fetchAvailableInvitationTokens() {
    try {
      const response = await Api.get('invitation-token/unused')
      if (!response.data || !Array.isArray(response.data)) {
        setInvitaionCodeArray([]);
        return;
      }
      // Ensure the data is an array before setting it
      if (!Array.isArray(response.data)) {

        console.error("Expected an array but received:", response.data);
        return;
      }
      setInvitaionCodeArray(response.data);
    } catch (error) {
      console.error("Error fetching invitation codes:", error);
    }
  }
  useEffect(() => {
    fetchAvailableInvitationTokens()
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
    Api.post('/invitation-token', { email: data.email }).then((res: { data: any; }) => {
      res.data.token && navigator.clipboard.writeText(res.data.token);
      setRecentGeneratedToken(res.data.token);
      fetchAvailableInvitationTokens();
    }).catch((err: any) => {
      setError(err.response && err.response.data && err.response.data.message ? "email" : "email", { type: "manual", message: err.response && err.response.data && err.response.data.message ? err.response.data.message : "An unexpected error occurred." });
      if (err.response && err.response.data && err.response.data.message) {
        setError("email", { type: "manual", message: err.response.data.message });
        notifyBadge(err.response.data.message);
      } else {
        setError("email", { type: "manual", message: "An unexpected error occurred." });
        notifyBadge("An unexpected error occurred");
      }
    });
  }
  function withoutEmailTokenGen() {
    Api.post('/invitation-token', { email: 'tokenGen' }).then((res: { data: any; }) => {
      res.data.token && navigator.clipboard.writeText(res.data.token);
      setRecentGeneratedToken(res.data.token);
      fetchAvailableInvitationTokens();
    }).catch((err: any) => {
      if (err.response && err.response.data && err.response.data.message) {
        setError("email", { type: "manual", message: err.response.data.message });
        notifyBadge(err.response.data.message);
      } else {
        setError("email", { type: "manual", message: err.response.data.message || "An unexpected error occurred." });
        notifyBadge("An unexpected error occurred");
      }
    });
    setApiPostMode(false);
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      {/* <h1 className="text-2xl font-bold mb-4">Code List</h1> */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-950 border border-gray-800">
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
              <tr key={items.id} className=" relative  overflow-visible">
                <td className="relative pl-4 flex hover:bg-gray-900 border-t-1 border-gray-900 group" onClick={() => CopyInvCodeToClipboard(items.token)}>
                  <span className="truncate w-60 ">{items.token}</span>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 p-2 rounded-4xl">
                    <Copy />
                  </span>
                </td>
                <td className="px-4 py-2 border-1 border-gray-900 w-100">{items.email}</td>
                <td className="px-4 py-2 border-1 border-gray-900 w-20 text-center">{items.isUsed ? 'in active' : 'available'}</td>
                <td className="px-4 py-2 border-1 border-gray-900 w-30 text-center">{formatDateTime(items.createdAt)}</td>
                <td className="px-4 py-2 border-1 border-gray-900 w-30 text-center">{formatDateTime(items.expiresAt)}</td>
                <td className="px-4 py-2 border-1 border-gray-900 w-100">
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
                <button className="absolute right-1 top-1 bottom-1 px-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600" type={apiPostMode ? 'submit' : 'button'} onClick={() => { withoutEmailTokenGen() }}>
                  {value ? 'Assign email' : 'Generate token'}
                </button>
              </div>
            )} />
        </form>
      </div>
      <Toaster />
    </div>
  );
};