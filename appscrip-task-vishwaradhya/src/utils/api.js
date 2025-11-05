export async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    return await res.json();
  } catch (error) {
    console.log("API Error:", error);
    return [];
  }
}
