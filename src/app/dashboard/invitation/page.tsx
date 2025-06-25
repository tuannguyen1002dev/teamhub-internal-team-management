'use client'

import Api from "@/shared/api";
import React, { JSX, useEffect, useState } from "react";

const invitaionCodeArray = [
  {
    id: 1,
    code: "INV12345",
    status: "Pending",
    createdAt: "2023-10-01",
    createBy: "Admin",
  },
  {
    id: 2,
    code: "INV67890",
    status: "Accepted",
    createdAt: "2023-10-02",
    createBy: "Admin",
  },
  {
    id: 3,
    code: "INV54321",
    status: "Expired",
    createdAt: "2023-10-03",
    createBy: "Admin",
  },
];

const UserList = () => {

  const [invCodeCheck, setInvCodeCheck] = useState<string | null>("");
  const [invitaionCodeArray, setInvitaionCodeArray] = useState<any[]>([]);

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

  return (
    <div className="flex flex-col gap-3 p-3">
      <h1 className="text-2xl font-bold mb-4">Code List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-gray-200">
          <thead>
            <tr className="text-start">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border text-start">Code</th>
              <th className="px-4 py-2 border text-start">Status</th>
              <th className="px-4 py-2 border text-start">Created time</th>
              <th className="px-4 py-2 border text-start">Created by</th>
            </tr>
          </thead>
          <tbody>

            {/* !! FIX THIS TABLE TO FIT WITH DATABSE CHECK FIELD */}

            {Array.isArray(invitaionCodeArray) && invitaionCodeArray.map(items => (
              <tr key={items.id} className="hover:bg-gray-900 relative group overflow-visible h-15">
                <td className="px-4 py-2 border text-center">{items.id}</td>
                <td className="px-4 py-2 border-t flex flex-row gap-3 justify-center items-center h-15" onClick={() => CopyInvCodeToClipboard(items.code)}>{items.code}
                  {invCodeCheck == items.code
                    ? <span className="p-1 bg-green-500/20">copied</span>
                    : <span className=" bg-red-500/20"></span>}
                </td>
                <td className="px-4 py-2 border">{items.status}</td>
                <td className="px-4 py-2 border">{items.createdAt}</td>
                <td className="px-4 py-2 border">
                  <span>{items.createBy}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-end items-center">
        <button onClick={generateCode}>
          Generate code
        </button>
      </div>
    </div>
  );
};

export default UserList;
