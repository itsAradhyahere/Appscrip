import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function MobileMenu({ open, onClose }) {
  return (
    <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}>
      <button className={styles.drawerClose} onClick={onClose}>✕</button>
      <Link href="/" onClick={onClose}>Home</Link>
      <Link href="/products" onClick={onClose}>Products</Link>
    </div>
  );
}
