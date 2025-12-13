'use client'

import Api from "@/shared/utils/api";
import { Copy } from "lucide-react";
import { useToast } from "@/contexts/alertToastContext";
import { useFeatureAlert } from "@/contexts/featuresAlert";

// icons import
import { Check } from 'lucide-react';

import React, { useEffect, useState } from 'react';

import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form"


export default function Invitation() {

  const { showToast } = useToast();
  const { showBanner } = useFeatureAlert();


  const [invitationList, setInvitationList] = useState<any[]>([])
  const [openCRUDPanel, setOpenCRUDPanel] = useState<boolean>(false)

  function CRpanel() {
    setOpenCRUDPanel(!openCRUDPanel)
  }

  async function fetchInvitationList() {
    Api.get('/api/invitation').then((res) => {
      setInvitationList(res.data);
      console.log('Fetched invitations:', res.data);
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
      showToast('Invitation sent successfully!', 'success');
    }).catch((error) => {
      showToast(`Error ${error.response.status}: ${error.response.data.error}`, 'error');
    });
  }

  function CopyInvCodeToClipboard(token: string) {
    navigator.clipboard.writeText(token).then(() => {
      // console.log('Invitation code copied to clipboard:', token);
      showBanner(<Check />, `Copied`, 'success');
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
    // return `${day} / ${month} / ${year} ${hours}: ${minutes}`;
    return `${day} / ${month}`;
  }

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <label htmlFor="addUserInput" className="text-2xl font-bold">Invitation section</label>
        <div className="input-field-xl-container">
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <input {...field} placeholder='email address'
              className="input-field-xl-primary"
            />}
          />
          <button className="btn-primary" type="submit">
            Send Invitation
          </button>
        </div>
      </form >
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold">Invitation list</p>
        <table className="min-w- w-full bg-black/30 rounded-xl overflow-y-auto">
          <thead>
            <tr className="text-start bg-black20 text-white text-md">
              <th className="px-4 py-2 max-w-15 border-r-1 border-white/10  text-center">Access token</th>
              <th className="px-4 py-2 max-w-30 border-r-1 border-white/10 text-start">email</th>
              <th className="px-4 py-2 max-w-10 border-r-1 border-white/10 text-center">Status</th>
              <th className="px-4 py-2 max-w-15 border-r-1 border-white/10 text-center">Invite by</th>
              <th className="px-4 py-2 max-w-15 border-r-1 border-white/10 text-center">Create at</th>
              <th className="px-4 py-2 max-w-10 text-center">Link</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(invitationList) && invitationList.map((items) => (
              <tr key={items.id} className=" relative text-sm">
                <td
                  className="px-4 max-w-15 truncate transition-all duration-300 ease-in-out cursor-pointer border-r-1 border-white/10"
                  title={items.token}
                  onClick={() => CopyInvCodeToClipboard(items.token)}>
                  {items.token}
                </td>
                <td className="px-4 max-w-30 truncate py-2 border-r-1 border-white/10">
                  {items.email}
                </td>
                <td className="px-4 max-w-10 py-2 text-center border-r-1 border-white/10">
                  {items.status ? 'in active' : 'available'}
                </td>
                <td className="px-4 py-2 max-w-15  text-center border-r-1 border-white/10">
                  {items.createBy}
                </td>
                <td className="px-4 py-2 max-w-15  text-center border-r-1 border-white/10">
                  {items.createdAt ? formatDateTime(items.createdAt) : ''}
                </td>
                <td className="px-4 py-2 min-w-10 flex justify-center align-middle text-center"
                  onClick={() => CopyInvCodeToClipboard(items.invLink)}>
                  <Copy size={16} strokeWidth={1} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}