'use client'

import { prisma } from "@/lib/prisma";
import Api from "@/shared/utils/api";


import React, { useEffect, useState } from 'react';

import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form"


export default function Invitation() {

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

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <label htmlFor="addUserInput" className="text-2xl font-bold">Invitation section</label>
        <div className="input-field-container">
          <input type="text" id="addUserInput" placeholder="User email" className="input-field-primary" />
          <button className="btn-primary" type="submit">
            Send Invitation
          </button>
        </div>
      </form>
      <div>
        <p className="text-2xl font-bold">Invitation list</p>
      </div>
    </div>
  );
}