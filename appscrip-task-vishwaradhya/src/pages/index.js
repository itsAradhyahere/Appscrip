import { useState } from "react";
import Head from "next/head";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import styles from "@/styles/Home.module.css";

export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return { props: { products } };
}

export default function Home({ products }) {
  const [sortedProducts, setSortedProducts] = useState(products);

  const handleSort = (e) => {
    const value = e.target.value;
    let sorted = [...products];

    if (value === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted = products;
    }

    setSortedProducts(sorted);
  };

  return (
    <>
      <Head>
        <title>Product Listing</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <h1 className={styles.heading}>Product Listing</h1>

        <div className={styles.sortRow}>
          <label>Sort by:</label>
          <select className={styles.sortSelect} onChange={handleSort}>
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <div className={styles.grid}>
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
