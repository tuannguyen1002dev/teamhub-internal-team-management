import React from 'react';

const invitaionCodeArray = [
  { id: 1, code: 'INV12345', status: 'Pending', createdAt: '2023-10-01', createBy: 'Admin' },
  { id: 2, code: 'INV67890', status: 'Accepted', createdAt: '2023-10-02', createBy: 'Admin' },
  { id: 3, code: 'INV54321', status: 'Expired', createdAt: '2023-10-03', createBy: 'Admin' },
];

const UserList = () => {
  return (
    <div className="p-4">
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
            {invitaionCodeArray.map((items) => (
              <tr key={items.id} className="hover:bg-gray-900">
                <td className="px-4 py-2 border text-center">{items.id}</td>
                <td className="px-4 py-2 border">{items.code}</td>
                <td className="px-4 py-2 border">{items.status}</td>
                <td className="px-4 py-2 border">{items.createdAt}</td>
                <td className="px-4 py-2 border">{items.createBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;