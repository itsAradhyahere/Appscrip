import { createContext, useContext, useState } from "react";
import styles from "@/styles/Home.module.css";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && <div className={styles.toast}>{toast}</div>}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}
