import React from "react";
import { useEffect, useMemo, useState } from "react";
import Head from "next/head";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import MobileCategorySelect from "@/components/MobileCategorySelect";
import MasonryGrid from "@/components/MasonryGrid";
import SkeletonAdvanced from "@/components/SkeletonAdvanced";
import styles from "@/styles/Home.module.css";

/* -------------------------------
   SSR FETCH
-------------------------------- */
export async function getServerSideProps() {
  try {
    const [prodRes, catRes] = await Promise.all([
      fetch("https://fakestoreapi.com/products"),
      fetch("https://fakestoreapi.com/products/categories"),
    ]);

    const [products, categories] = await Promise.all([
      prodRes.json(),
      catRes.json(),
    ]);

    return { props: { products, categories } };
  } catch (error) {
    console.error("SSR API error:", error);
    return { props: { products: [], categories: [] } };
  }
}

/* -------------------------------
   ERROR BOUNDARY (PRODUCTION SAFE)
-------------------------------- */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, err: null };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, err };
  }
  componentDidCatch(err, info) {
    console.error("UI Crash:", err, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBox}>
          <h2>Something went wrong.</h2>
          <p>Try refreshing the page or coming back later.</p>
          <button onClick={() => location.reload()} className={styles.errorBtn}>
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* -------------------------------
   MAIN PAGE
-------------------------------- */
export default function Home({ products = [], categories = [] }) {
  const [sortType, setSortType] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  // UX loading state (for filter/sort/search changes)
  const [isFiltering, setIsFiltering] = useState(false);

  // Pagination
  const PAGE_SIZE = 8;
  const [page, setPage] = useState(1);

  // reset page when filters change + show skeleton for polish
  useEffect(() => {
    setIsFiltering(true);
    setPage(1);
    const t = setTimeout(() => setIsFiltering(false), 250);
    return () => clearTimeout(t);
  }, [sortType, searchQuery, activeCat]);

  // scroll to top on page change (nice UX)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  const sortedFilteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCat !== "all") {
      list = list.filter((p) => p.category === activeCat);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (sortType === "lowToHigh") list.sort((a, b) => a.price - b.price);
    if (sortType === "highToLow") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, sortType, searchQuery, activeCat]);

  const totalPages = Math.ceil(sortedFilteredProducts.length / PAGE_SIZE) || 1;

  const paginatedProducts = sortedFilteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* -------------------------------
     PAGINATION BUTTONS (SMART)
  -------------------------------- */
  const getPaginationRange = () => {
    const delta = 1; // pages around current
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l > 2) rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <ErrorBoundary>
      <Head>
        <title>Products | Appscrip Task</title>
        <meta
          name="description"
          content="Premium product listing page with SSR, masonry, cart drawer, toast, filters and pagination."
        />
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.titleRow}>
          <h1 className={styles.heading}>Product Listing</h1>
         
        </div>

        <div className={styles.layout}>
          {/* Desktop sidebar */}
          <CategoryFilter
            categories={categories}
            active={activeCat}
            onChange={setActiveCat}
          />

          <div className={styles.rightArea}>
            {/* Mobile category dropdown */}
            <MobileCategorySelect
              categories={categories}
              active={activeCat}
              onChange={setActiveCat}
            />

            {/* Search + Sort */}
            <div className={styles.topRow}>
              <input
                className={styles.searchBox}
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className={styles.sortRow}>
                <label className={styles.sortLabel}>Sort by:</label>
                <select
                  className={styles.sortSelect}
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Masonry / Skeleton / Empty */}
            {products.length === 0 || isFiltering ? (
              <MasonryGrid>
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <SkeletonAdvanced key={i} />
                ))}
              </MasonryGrid>
            ) : paginatedProducts.length > 0 ? (
              <MasonryGrid>
                {paginatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </MasonryGrid>
            ) : (
              <p className={styles.noResults}>
                No products found. Try changing filters.
              </p>
            )}

            {/* Pagination */}
            {sortedFilteredProducts.length > PAGE_SIZE && (
              <div className={styles.pagination}>
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </button>

                {getPaginationRange().map((p, idx) =>
                  p === "..." ? (
                    <span key={`dots-${idx}`} className={styles.pageDots}>
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      className={`${styles.pageBtn} ${
                        page === p ? styles.pageActive : ""
                      }`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </ErrorBoundary>
  );
}
