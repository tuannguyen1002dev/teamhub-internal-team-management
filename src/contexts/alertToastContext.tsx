"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ToastType = "default" | "success" | "error" | "warning";

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "default") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // auto-hide after 3s
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
}

export function useToast({ message, type }: { message?: string; type?: ToastType } = {}) {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Toast UI Component inside this file (optional)
function Toast({ message, type }: { message: string; type: ToastType }) {
  return (
    <div
      className={`fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white animate-toast
        ${type === "success" ? "bg-green-600" : ""}
        ${type === "error" ? "bg-red-600" : ""}
        ${type === "warning" ? "bg-yellow-600" : ""}
        ${type === "default" ? "bg-gray-800" : ""}`}>
      {message}
    </div>
  );
}
