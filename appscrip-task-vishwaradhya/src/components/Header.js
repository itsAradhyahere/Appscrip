import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function Header() {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerInner}>
        <div className={styles.logoArea}>
          <Image src="/Images/Logo.png" alt="Logo" width={130} height={36} />
        </div>

        <nav className={styles.headerNav}>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
        </nav>
      </div>
    </header>
  );
}
