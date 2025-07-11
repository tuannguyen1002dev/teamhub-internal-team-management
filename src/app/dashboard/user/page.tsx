'use client'

import useDialog from '@/contexts/DialogProvider';
import Api from '@/shared/api';
import React, { useEffect, useState } from 'react';

const UserList = () => {

  const [userList, setUserList] = useState<any[]>([])
  const { openDialog, closeDialog } = useDialog();

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

  useEffect(() => {
    fetchUserList()
  }, [])

  // !! Dialog contentds

  const handleOpen = () => {
    openDialog({
      title: 'Add new user',
      content: (
        <div>
          <form>
          <
          </form>
        </div>
      )
    })
  };


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
          <button className="rounded-md bg-gray-800 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-gray-500" onClick={handleOpen}>
            Add new User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;