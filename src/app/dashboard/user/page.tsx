'use client'

import { prisma } from "@/lib/prisma";
import Api from "@/shared/utils/api";


import React, { useEffect, useState } from 'react';

import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form"


const UserList = () => {

  const [userList, setUserList] = useState<any[]>([])
  const [openCRUDPanel, setOpenCRUDPanel] = useState<boolean>(false)

  function CRpanel() {
    setOpenCRUDPanel(!openCRUDPanel)
  }

  async function fetchUserList() {
    const res = await fetch("/api/users");
    const data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    fetchUserList()
  }, [])

  // !! Dialog contentds
  interface IFormInputs {
    email: string
    fullname: string
    username: string
    phone: string
    dateofbirth: string
    address: string
  }

  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      fullname: '',
      username: '',
      phone: '',
      dateofbirth: '',
      address: '',
    },
  })
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  }


  //TODO: format DateOfBirth
  const watchedDate = useWatch({ control, name: "dateofbirth" });
  const formatToDDMMYYYY = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
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

      {/* Form container */}
      <div className={`button-container fixed transition-all duration-500 ease-in-out  ${openCRUDPanel ? `bottom-70 right-10` : `bottom-10 right-10`}`}>
        <button className={`relative rounded-md bg-gray-800 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-gray-500`}
          onClick={() => CRpanel()}>
          <span className={`inline-block transition-all duration-500 ease-in-out ${openCRUDPanel ? 'translate-y-[50%] opacity-0' : 'translate-y-0 opacity-100'}`}>
            Add new User
          </span>
          <span className={`absolute left-4.5 top-1.5 inline-block transition-all duration-500 ease-in-out ${openCRUDPanel ? 'translate-y-0 opacity-100' : '-translate-y-[50%] opacity-0'}`}>
            Close Form
          </span>
        </button>
      </div>
      <div className={`w-full h-fit bg-white fixed bottom-0 left-0 transform p-6 rounded-2xl transition-all ease-in-out ${openCRUDPanel ? 'translate-y-[0%] opacity-100 duration-800' : 'translate-y-[100%] opacity-0 duration-500'}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-3 ">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-black">
              Full Name
            </label>
            <Controller
              name="fullname"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field} placeholder='full-name'
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-black">
              Username
            </label>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field} placeholder='Username'
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-black">
              Email address
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-black">
              Phone number
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field} placeholder="phone"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />}
            />
          </div>
          <div className="flex flex-row gap-0">
            {/* Date picker */}
            <div className="flex flex-col gap-1 w-full">
              <label className="font-bold text-black">Date of birth</label>
              <div className="flex flex-row gap-2 w-full">
                <input
                  disabled
                  type="text"
                  value={formatToDDMMYYYY(watchedDate)}
                  readOnly
                  className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 disabled:opacity-60 w-full"
                />
                <Controller
                  name="dateofbirth"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="text-black px-4 py-2 rounded-lg w-13 border-none focus:outline-none"
                    />
                  )}
                />

              </div>
            </div>

          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-black">
              Address
            </label>
            <Controller
              name="address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field} placeholder="address"
                className="px-4 py-2 border borderF-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />}
            />
          </div>
          <button type="submit" className="col-span-3 mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Add User
          </button>
        </form>
      </div>
    </div >
  );
};

export default UserList;