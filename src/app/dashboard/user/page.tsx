'use client'

import Api from '@/shared/api';
import React, { useEffect, useState } from 'react';

const UserList = () => {

  const [userList, setUserList] = useState<any[]>([])
  const [dialog, setDialog] = useState<boolean>(false)

  function activeDialog() {
    setDialog(!dialog)
  }

  function fetchUserList(): void {
    Api.get('user').then((res) => {
      if (res.data) {
        setUserList(res.data)
        console.log(res.data)
      }
    }).catch((res) => {

    })
  }

  function CreateUserViaEmail() {
    Api.post('user', {}).then()
  }

  function Dialog() {
    return (
      <>{dialog &&
        <div className="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
          {/* <!--
        Background backdrop, show/hide based on dialog state.

        Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
        Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
      --> */}
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-base font-semibold text-gray-900" id="dialog-title">Deactivate account</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                  <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      </>
    )
  }

  useEffect(() => {
    fetchUserList()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto felx flex-col gap-6">
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
            {/* {Array.isArray(invitaionCodeArray) && invitaionCodeArray.map(items => (
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
            ))} */}
          </tbody>
        </table>
        <div className="w-full flex justify-end">
          <button className="rounded-md bg-gray-800 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-gray-500" onClick={activeDialog}>
            Add new User
          </button>
        </div>
        <Dialog />
      </div>
    </div>
  );
};

export default UserList;