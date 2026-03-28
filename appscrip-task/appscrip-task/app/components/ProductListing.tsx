"use client";

import { useState, useMemo, useCallback } from "react";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
import type { Product, SortOption, FilterState } from "../types/product";

interface ProductListingProps {
  initialProducts: Product[];
  categories: string[];
}

const PRODUCTS_PER_PAGE = 12;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ProductListing({ initialProducts, categories }: ProductListingProps) {
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceMin: 0,
    priceMax: 1000,
    minRating: 0,
  });

  // Category product counts
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [initialProducts]);

  // Filter + sort logic
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }

    list = list.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    );

    if (filters.minRating > 0) {
      list = list.filter((p) => p.rating.rate >= filters.minRating);
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        list.sort((a, b) => b.rating.count - a.rating.count);
        break;
      case "newest":
        list.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return list;
  }, [initialProducts, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const removeCategory = useCallback(
    (cat: string) => {
      handleFilterChange({
        ...filters,
        categories: filters.categories.filter((c) => c !== cat),
      });
    },
    [filters, handleFilterChange]
  );

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  // Active filter chips
  const activeFilterChips = [
    ...filters.categories.map((cat) => ({
      label: cat,
      remove: () => removeCategory(cat),
    })),
    ...(filters.priceMax < 1000
      ? [
          {
            label: `Max $${filters.priceMax}`,
            remove: () => handleFilterChange({ ...filters, priceMax: 1000 }),
          },
        ]
      : []),
    ...(filters.minRating > 0
      ? [
          {
            label: `${filters.minRating}★ & up`,
            remove: () => handleFilterChange({ ...filters, minRating: 0 }),
          },
        ]
      : []),
  ];

  const filterContent = (
    <Filters
      categories={categories}
      filters={filters}
      onFilterChange={handleFilterChange}
      productCounts={productCounts}
    />
  );

  return (
    <>
      {/* Toolbar */}
      <div className="toolbar" role="toolbar" aria-label="Products toolbar">
        <div className="toolbar-left">
          <p className="result-count" aria-live="polite" aria-atomic="true">
            <strong>{filteredProducts.length}</strong> Products
          </p>

          {activeFilterChips.length > 0 && (
            <div className="active-filter-tags" role="list" aria-label="Active filters">
              {activeFilterChips.map((chip) => (
                <button
                  key={chip.label}
                  className="filter-chip"
                  onClick={chip.remove}
                  aria-label={`Remove filter: ${chip.label}`}
                  role="listitem"
                >
                  {chip.label}
                  <span className="filter-chip-remove" aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="toolbar-right">
          {/* Mobile filter toggle */}
          <button
            className="filter-toggle-btn"
            onClick={() => setSidebarOpen(true)}
            aria-expanded={sidebarOpen}
            aria-controls="filter-drawer"
            aria-label="Open filters"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Filter
          </button>

          {/* Sort */}
          <label htmlFor="sort-select" className="sr-only">Sort products</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            aria-label="Sort products by"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* View toggle */}
          <div className="view-toggle" role="group" aria-label="View mode">
            <button
              className={`view-btn${viewMode === "grid" ? " active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" aria-hidden="true">
                <rect x="0" y="0" width="5.5" height="5.5" rx="1" />
                <rect x="7.5" y="0" width="5.5" height="5.5" rx="1" />
                <rect x="0" y="7.5" width="5.5" height="5.5" rx="1" />
                <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" />
              </svg>
            </button>
            <button
              className={`view-btn${viewMode === "list" ? " active" : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" aria-hidden="true">
                <rect x="0" y="0" width="13" height="3.5" rx="1" />
                <rect x="0" y="4.75" width="13" height="3.5" rx="1" />
                <rect x="0" y="9.5" width="13" height="3.5" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Page body: sidebar + products */}
      <div className="page-body">
        {/* Desktop sidebar */}
        {filterContent}

        {/* Products area */}
        <main className="products-area" id="main-content">
          <h1 className="sr-only">Women&apos;s Clothing — Product Listing</h1>

          <ProductGrid
            products={paginatedProducts}
            viewMode={viewMode}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="pagination" aria-label="Product pages">
              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page-btn${currentPage === page ? " active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              ))}

              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                →
              </button>
            </nav>
          )}
        </main>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <div
        id="filter-drawer"
        className={`sidebar-drawer${sidebarOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
      >
        <div className="sidebar-drawer-header">
          <span className="sidebar-drawer-title">Filters</span>
          <button
            className="close-drawer-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>
        {filterContent}
      </div>
    </>
  );
}
