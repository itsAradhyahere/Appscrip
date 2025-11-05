import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function Header() {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <div className={styles.headerLeft}>
          <Image
            src="/images/Logo.png"
            alt="Appscrip"
            className={styles.headerLogo}
            width={80}
            height={80}
            priority
          />
          <h2 className={styles.headerTitle}>APPSCRIP</h2>
        </div>

        {/* Search Bar */}
        <div className={styles.headerSearchWrapper}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.headerSearch}
          />
        </div>

        {/* Navigation / Right Links */}
        <nav className={styles.headerNav}>
          <a>Home</a>
          <a>Products</a>
          <a>About</a>
          <a>Contact</a>
        </nav>

      </div>
    </header>
  );
}
