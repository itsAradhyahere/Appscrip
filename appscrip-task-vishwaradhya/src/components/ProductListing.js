"use client"; // (if you were in app router; harmless here)
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductListing({ products }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");

  const filteredSorted = useMemo(() => {
    let list = products.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, query, sort]);

  return (
    <>
      <div className="toolbar">
        <input
          className="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="sortWrap">
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Default</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {filteredSorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
