// src/pages/api/products.js
export default async function handler(req, res) {
  try {
    const r = await fetch("https://fakestoreapi.com/products");
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
