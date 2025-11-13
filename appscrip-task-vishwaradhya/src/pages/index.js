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
      sorted = products; // default order
    }

    setSortedProducts(sorted);
  };

  return (
    <>
      <Head>
        <title>Products | Appscrip Task</title>
        <meta
          name="description"
          content="Product listing page created as part of Appscrip assignment with Next.js and fakestoreapi."
        />
      </Head>

      {/* ✅ Header */}
      <Header />

      <main className={styles.container}>
        <h1 className={styles.heading}>Product Listing</h1>

        {/* ✅ Sort Dropdown */}
        <div className={styles.sortRow}>
          <label>Sort by:</label>
          <select className={styles.sortSelect} onChange={handleSort}>
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* ✅ Product Grid */}
        <div className={styles.grid}>
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </>
  );
}
