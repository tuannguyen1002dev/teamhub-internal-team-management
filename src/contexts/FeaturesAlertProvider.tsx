"use client";
import { createContext, useContext, useState, useCallback, ReactNode, useRef, useEffect, CSSProperties } from "react";
import { v4 as uuidv4 } from 'uuid';

type FeatureAlertType = "default" | "success" | "error" | "warning";

type FeatureAlerValue = {
  showBanner: (icon: ReactNode, message: string, type?: FeatureAlertType) => void;
};

type Toast = {
  id: string;
  icon: ReactNode;
  message: string;
  type: FeatureAlertType;
  isExiting: boolean;
};

const FeatureAlertContext = createContext<FeatureAlerValue | undefined>(undefined);
const MAX_TOASTS = 5; // maximum stacked alerts
const DISPLAY_MS = 3000; // visible time before exit
const ANIM_MS = 300; // animation duration

export function FeatureAlertProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  // store timeouts per toast id
  const timeouts = useRef<Map<string, { exit?: number; remove?: number }>>(new Map());

  useEffect(() => () => {
    // clear any remaining timeouts on unmount
    timeouts.current.forEach(({ exit, remove }) => { if (exit) clearTimeout(exit); if (remove) clearTimeout(remove); });
    timeouts.current.clear();
  }, []);

  const clearToastTimeouts = (id: string) => {
    const t = timeouts.current.get(id);
    if (!t) return;
    if (t.exit) clearTimeout(t.exit);
    if (t.remove) clearTimeout(t.remove);
    timeouts.current.delete(id);
  };

  const scheduleForToast = (id: string) => {
    // schedule exit animation
    const exit = window.setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t)));
      // clear stored exit
      const stored = timeouts.current.get(id);
      if (stored) { delete stored.exit; if (!stored.remove) timeouts.current.delete(id); }
    }, DISPLAY_MS);

    // schedule removal after animation completes
    const remove = window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      clearToastTimeouts(id);
    }, DISPLAY_MS + ANIM_MS);

    timeouts.current.set(id, { exit, remove });
  };

  const showBanner = useCallback((icon: ReactNode, message: string, type: FeatureAlertType = "default") => {
    const id = uuidv4();

    setToasts((prev) => {
      // if exceed max, remove oldest immediately (and clear its timeouts)
      let updated = [...prev, { id, icon, message, type, isExiting: false }];
      if (updated.length > MAX_TOASTS) {
        const oldest = updated[0];
        // clear the oldest timeouts so they won't fire later
        clearToastTimeouts(oldest.id);
        updated = updated.slice(1);
      }
      return updated;
    });

    // schedule exit & removal for this toast
    scheduleForToast(id);
  }, []);

  return (
    <FeatureAlertContext.Provider value={{ showBanner }}>
      {children}
      <div className="fixed bottom-[5%] right-[5%] flex flex-col-reverse gap-3 pointer-events-none">
        {toasts.map((t) => (
          <Toast key={t.id} icon={t.icon} message={t.message} type={t.type} isExiting={t.isExiting} />
        ))}
      </div>
    </FeatureAlertContext.Provider>
  );
}

export function useFeatureAlert() {
  const context = useContext(FeatureAlertContext);
  if (!context) throw new Error("useFeatureAlert must be used within FeatureAlrtProvider");
  return context;
}

function Toast({ icon, message, type, isExiting }: { icon: ReactNode; message: string; type: FeatureAlertType; isExiting: boolean }) {
  const getBackgroundColor = () => {
    switch (type) {
      case "success": return "bg-green-600";
      case "error": return "bg-red-600";
      case "warning": return "bg-yellow-600";
      default: return "bg-gray-800";
    }
  };

  const style: CSSProperties = {
    transition: `all ${ANIM_MS}ms ease-out`,
    opacity: isExiting ? 0 : 1,
    transform: isExiting ? "translateY(0px) opacity-0" : "translateY(0) opacity-100",
    transformOrigin: "top",
  };

  return (
    <div style={style} className={`flex flex-row gap-2 items-center px-2 py-1 rounded-lg shadow-lg text-white pointer-events-auto ${getBackgroundColor()}`}>
      <span>{icon}</span>
      <span className="max-w-xs truncate">{message}</span>
    </div>
  );
}
