import styles from "@/styles/Home.module.css";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <Image src={product.image} alt={product.title} width={300} height={200} className={styles.image} />
      <h2 className={styles.title}>{product.title}</h2>
      <p className={styles.price}>${product.price}</p>
    </div>
  );
}
