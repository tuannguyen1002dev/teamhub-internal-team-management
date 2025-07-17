'use client'

import React, { useEffect, useState, useContext, createContext, ReactNode } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react"



interface DialogData {
  title?: string;
  content: ReactNode;
}

interface DialogContextProps {
  openDialog: (data: DialogData) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextProps | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogData, setDialogData] = useState<DialogData | null>(null);

  const openDialog = (data: DialogData) => setDialogData(data);
  const closeDialog = () => setDialogData(null);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialogData &&
        ReactDOM.createPortal(
          <div className="dialog-wrapper fixed flex justify-center items-center inset-0 z-50 bg-black/50 backdrop-blur-xs">
            <div className="rounded-2xl min-w-lg h-fit bg-white/10 backdrop-blur-2xl text-white">
              <div className="w-full p-3 flex flex-row justify-between items-center border-b-1 border-white/30">
                <span>{dialogData.title}</span>
                <button className="rounded-4xl text-gray-700 bg-transparent hover:bg-gray-300 p-1 transition-all duration-500 ease-in-out" onClick={closeDialog}>
                  <X />
                </button>
              </div>
              <div className="p-6">
                {dialogData.content}
              </div>
            </div>

          </div>,
          document.body
        )}
    </DialogContext.Provider>
  )
}

export default function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
