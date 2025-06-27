'use client'

import Api from "@/shared/api";
import React, { JSX, useEffect, useState, useRef } from "react";

import { Copy } from "lucide-react";

export default function InvitationPanel() {

  const inputEmailRef = useRef<HTMLInputElement | null>(null);

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

  async function generateCode() {
    Api.post('/invitation-token', { email: 'tuannguyencorei7@gmail.com' }).then((res: { data: any; }) => {
      console.log(res.data);
      // You can update the invitaionCodeArray state here to reflect the new code
    }).catch((err: any) => {
      console.error("Error generating code:", err);
      // Handle error appropriately, e.g., show an alert
    });
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

  async function handleGenerateCode(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // console.log("Generating code...", inputEmailRef.current?.value);
    try {
      Api.post('/invitation-token', { email: inputEmailRef.current?.value }).then((res: { data: any; }) => {
        console.log(res.data);
        setRecentGeneratedToken(res.data.token);
        fetchInvitationCodes();
      }).catch((err: any) => {
        console.error("Error generating code:", err);
      });
    } catch (error) {
      console.error("Error generating code:", error);
    }
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      <h1 className="text-2xl font-bold mb-4">Code List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-gray-200">
          <thead>
            <tr className="text-start">
              <th className="px-4 py-2 border text-start">Access token</th>
              <th className="px-4 py-2 border text-start">email</th>
              <th className="px-4 py-2 border text-center">Status</th>
              <th className="px-4 py-2 border text-center">Created time</th>
              <th className="px-4 py-2 border text-center">Expires time</th>
              <th className="px-4 py-2 border text-start">Created by</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(invitaionCodeArray) && invitaionCodeArray.map(items => (
              <tr key={items.id} className="hover:bg-gray-900 relative group overflow-visible h-15">
                <td className="pl-4 py-2 border-t flex flex-row gap-3 justify-start items-center h-15" onClick={() => CopyInvCodeToClipboard(items.token)}>
                  <span className="truncate w-50">{items.token}</span>
                  {invCodeCheck == items.code
                    ? <span className="p-1 bg-green-500/20">copied</span>
                    : <span className=" bg-red-500/20"></span>}
                </td>
                <td className="px-4 py-2 border w-150">{items.email}</td>
                <td className="px-4 py-2 border w-40 text-center">{items.isUsed ? 'in active' : 'available'}</td>
                <td className="px-4 py-2 border w-40 text-center">{formatDateTime(items.createdAt)}</td>
                <td className="px-4 py-2 border w-40 text-center">{formatDateTime(items.expiresAt)}</td>
                <td className="px-4 py-2 border w-60">
                  <span>{items.createBy}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row gap-3 mt-4 w-full justify-end items-center">
        <div className={`relative w-100 transition-all duration-500 ease-in-out ${recentGeneratedToken ? 'opacity-100' : 'opacity-0'}`}>
          <input type="text" placeholder="access token" className="w-full pr-20 pl-4 py-2 border-gray-300 rounded-4xl border-0 outline-none focus:outline-none" disabled />
          <button className="absolute right-1 top-1 bottom-1 px-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600">
            <Copy size={16} />
          </button>
        </div>
        <div className="relative w-100">
          <input ref={inputEmailRef} type="text" placeholder="Enter new user email" className="w-full pr-20 pl-4 py-2 border border-gray-300 rounded-4xl focus:outline-none" />
          <button className="absolute right-1 top-1 bottom-1 px-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600" onClick={(e) => handleGenerateCode(e)}>
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};