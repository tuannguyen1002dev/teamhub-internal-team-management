'use client'

import { prisma } from "@/lib/prisma";
import Api from "@/shared/utils/api";
import { Copy } from "lucide-react";


import React, { useEffect, useState } from 'react';

import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form"


export default function Invitation() {

  const [invitationList, setInvitationList] = useState<any[]>([])
  const [openCRUDPanel, setOpenCRUDPanel] = useState<boolean>(false)

  function CRpanel() {
    setOpenCRUDPanel(!openCRUDPanel)
  }

  async function fetchInvitationList() {
    Api.get('/api/invitation').then((res) => {
      setInvitationList(res.data);
    }).catch((error) => {
      console.error('Error fetching invitations:', error);
    });
  }

  useEffect(() => {
    fetchInvitationList()
  }, [])

  interface IFormInputs {
    email: string
  }

  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
    },
  })
  function onSubmit(data: IFormInputs) {
    const { email } = data;
    Api.post('/api/invitation', { email }).then((res) => {
      reset();
      fetchInvitationList()
    }).catch((error) => {
      console.error('Error creating user:', error);
    });
  }

  function CopyInvCodeToClipboard(token: string) {
    navigator.clipboard.writeText(token).then(() => {
      console.log('Invitation code copied to clipboard:', token);
    }).catch((error) => {
      console.error('Failed to copy invitation code:', error);
    });
  }

  //TODO: format DateOfBirth
  function formatDateTime(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <label htmlFor="addUserInput" className="text-2xl font-bold">Invitation section</label>
        <div className="input-field-container">
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <input {...field} placeholder='email address'
              className="input-field-primary"
            />}
          />
          <button className="btn-primary" type="submit">
            Send Invitation
          </button>
        </div>
      </form >
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold">Invitation list</p>
        <table className="min-w-full bg-black border border-none">
          <thead>
            <tr className="text-start bg-gray-800 text-white text-md">
              <th className="px-4 py-2 text-start">Access token</th>
              <th className="px-4 py-2 border-l-1 border-gray-950 text-start">email</th>
              <th className="px-4 py-2 border-l-1 border-gray-950 text-center">Status</th>
              <th className="px-4 py-2 border-l-1 border-gray-950 text-center">Sent</th>
              <th className="px-4 py-2 border-l-1 border-gray-950 text-start">Created by</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(invitationList) && invitationList.map((items) => (
              <tr key={items.id} className=" relative  overflow-visible text-sm">
                <td className=" flex justify-center items-center w-20 pl-4 transition-all duration-300 ease-in-out hover:bg-gray-900 border-t-1 border-gray-900" onClick={() => CopyInvCodeToClipboard(items.token)}>
                  <span className="truncate w-60 text-center">{items.token}</span>
                </td>
                <td className="px-4 py-2 border-1 border-gray-900">{items.email}</td>
                <td className="px-4 py-2 border-1 border-gray-900 text-center">{items.status ? 'in active' : 'available'}</td>
                <td className="px-4 py-2 border-1 border-gray-900 text-center">{formatDateTime(items.sentAt)}</td>
                <td className="px-4 py-2 border-1 border-gray-900 text-center">{items.createBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}