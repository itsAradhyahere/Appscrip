export const getCart = () =>
  JSON.parse(localStorage.getItem("cart") || "[]");

export const addToCart = (item) => {
  const cart = getCart();
  const exists = cart.find((c) => c.id === item.id);
  const updated = exists
    ? cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
    : [...cart, { ...item, qty: 1 }];

  localStorage.setItem("cart", JSON.stringify(updated));
  return updated;
};
