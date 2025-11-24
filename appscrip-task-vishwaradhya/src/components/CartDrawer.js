import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, updateQty, clearCart, totalPrice } = useCart();

  return (
    <div className={`${styles.cartDrawer} ${open ? styles.cartOpen : ""}`}>
      <div className={styles.cartHeader}>
        <h3>Your Cart</h3>
        <button onClick={onClose} className={styles.cartClose}>✕</button>
      </div>

      {cart.length === 0 ? (
        <div className={styles.cartEmpty}>Cart is empty</div>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map((p) => (
              <div key={p.id} className={styles.cartItem}>
                <div className={styles.cartImg}>
                  <Image src={p.image} alt={p.title} fill />
                </div>

                <div className={styles.cartInfo}>
                  <p className={styles.cartTitle}>{p.title}</p>
                  <p className={styles.cartPrice}>${p.price.toFixed(2)}</p>

                  <div className={styles.qtyRow}>
                    <button onClick={() => updateQty(p.id, p.qty - 1)}>-</button>
                    <span>{p.qty}</span>
                    <button onClick={() => updateQty(p.id, p.qty + 1)}>+</button>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(p.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartFooter}>
            <div className={styles.cartTotal}>
              Total: <b>${totalPrice.toFixed(2)}</b>
            </div>
            <div className={styles.cartActions}>
              <button className={styles.clearBtn} onClick={clearCart}>Clear</button>
              <button className={styles.checkoutBtn}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
