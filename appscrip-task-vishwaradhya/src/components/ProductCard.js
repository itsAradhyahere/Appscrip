import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAdd = () => {
    addToCart(product);
    showToast("Added to cart ✓");
  };

  return (
    <div className={styles.productCard}>
      <Link href={`/products/${product.id}`} className={styles.cardLink}>
        <div className={styles.imageWrap}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className={styles.productImage}
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
      </Link>

      <button className={styles.addCartBtn} onClick={handleAdd}>
        Add to cart
      </button>
    </div>
  );
}
