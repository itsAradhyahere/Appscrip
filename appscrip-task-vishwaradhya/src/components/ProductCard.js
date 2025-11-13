import styles from "@/styles/Home.module.css";
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <Image
        src={product.image}
        alt={product.title}
        className={styles.productImage}
        width={500}
        height={300}
        priority
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.price}>${product.price}</p>
    </div>
  );
}
