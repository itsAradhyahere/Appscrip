import { useToast } from "@/context/ToastContext";
import styles from "@/styles/Home.module.css";

export default function Toast() {
  const { toasts } = useToast();
  return (
    <div className={styles.toastWrap}>
      {toasts.map((t) => (
        <div key={t.id} className={styles.toast}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
