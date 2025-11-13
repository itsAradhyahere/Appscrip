import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function Header() {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerContent}>

        {/* Logo */}
        <div className={styles.headerLeft}>
          <Image src="/Images/Logo.png" alt="Logo" width={140} height={40} />
        </div>

        {/* Search Bar */}
        <div className={styles.headerSearchWrapper}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.headerSearch}
          />
        </div>

        {/* Navigation */}
        <nav className={styles.headerNav}>
          <Link href="/">Home</Link>
          <Link href="#">Products</Link>
        </nav>
      </div>
    </header>
  );
}
