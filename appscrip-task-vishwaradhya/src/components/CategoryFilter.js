import styles from "@/styles/Home.module.css";

// MUST be default export
export default function CategoryFilter({ categories = [], active = "all", onChange }) {
  const allCats = ["all", ...categories];

  return (
    <aside className={styles.sidebar}>
      <h4 className={styles.sidebarTitle}>Categories</h4>

      {allCats.map((c) => (
        <button
          key={c}
          onClick={() => onChange?.(c)}
          className={`${styles.catBtn} ${active === c ? styles.catActive : ""}`}
        >
          {c === "all" ? "All" : c}
        </button>
      ))}
    </aside>
  );
}
