import ProductCard from "./ProductCard";
import type { Product } from "../types/product";

interface ProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
  loading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton" style={{ height: "10px", width: "50%" }} />
        <div className="skeleton" style={{ height: "14px" }} />
        <div className="skeleton" style={{ height: "14px", width: "80%" }} />
        <div className="skeleton" style={{ height: "12px", width: "40%" }} />
        <div className="skeleton" style={{ height: "16px", width: "35%" }} />
      </div>
    </div>
  );
}

export default function ProductGrid({ products, viewMode, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div
        className={`product-grid${viewMode === "list" ? " list-view" : ""}`}
        aria-busy="true"
        aria-label="Loading products"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-grid">
        <div className="empty-state" role="status">
          <h2>No products found</h2>
          <p>Try adjusting your filters or search term to find what you are looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label={`${products.length} products`}
      aria-live="polite"
      aria-atomic="false"
    >
      <div className={`product-grid${viewMode === "list" ? " list-view" : ""}`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
