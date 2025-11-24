import styles from "@/styles/Home.module.css";

export default function MasonryGrid({ children }) {
  return <div className={styles.masonry}>{children}</div>;
}
