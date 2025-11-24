import styles from "@/styles/Home.module.css";

export default function ProductSkeleton() {
  return (
    <div className={styles.skelCard}>
      <div className={styles.skelImg} />
      <div className={styles.skelLine} />
      <div className={styles.skelLineSmall} />
    </div>
  );
}
