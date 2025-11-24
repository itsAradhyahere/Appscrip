import styles from "@/styles/Home.module.css";

export default function MobileCategorySelect({
  categories = [],
  active = "all",
  onChange,
}) {
  return (
    <div className={styles.mobileCatWrap}>
      <select
        className={styles.mobileCatSelect}
        value={active}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="all">All</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
