"use client";

import { type FilterState } from "../types/product";

interface FiltersProps {
  categories: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  productCounts: Record<string, number>;
}

const COLOR_SWATCHES = [
  { name: "White", hex: "#FFFFFF", border: "#ddd" },
  { name: "Black", hex: "#1A1714", border: "transparent" },
  { name: "Blush", hex: "#F2B8A0", border: "transparent" },
  { name: "Sage", hex: "#9CAF88", border: "transparent" },
  { name: "Navy", hex: "#2C3E6B", border: "transparent" },
  { name: "Camel", hex: "#C9996A", border: "transparent" },
  { name: "Ivory", hex: "#FAF0DC", border: "#ddd" },
  { name: "Burgundy", hex: "#7B2D3E", border: "transparent" },
];

const RATINGS = [4, 3, 2, 1];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <span
      style={{ color: filled ? "var(--accent)" : "var(--border-strong)", fontSize: "12px" }}
      aria-hidden="true"
    >
      ★
    </span>
  );
}

export default function Filters({
  categories,
  filters,
  onFilterChange,
  productCounts,
}: FiltersProps) {
  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onFilterChange({ ...filters, categories: next });
  };

  return (
    <aside className="sidebar" aria-label="Product filters">
      {/* Categories */}
      <section className="sidebar-section">
        <h2 className="sidebar-heading">Category</h2>
        <ul className="filter-list" role="group" aria-label="Filter by category">
          {categories.map((cat) => {
            const id = `cat-${cat.replace(/\s+/g, "-")}`;
            const checked = filters.categories.includes(cat);
            return (
              <li key={cat} className="filter-list-item">
                <input
                  type="checkbox"
                  id={id}
                  checked={checked}
                  onChange={() => toggleCategory(cat)}
                  aria-label={`Filter by ${cat}`}
                />
                <label htmlFor={id}>
                  <span style={{ textTransform: "capitalize" }}>{cat}</span>
                  <span className="filter-count">{productCounts[cat] ?? 0}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Price Range */}
      <section className="sidebar-section">
        <h2 className="sidebar-heading">Price Range</h2>
        <div className="price-range-wrap">
          <div className="price-labels">
            <span>
              Min: <strong>${filters.priceMin}</strong>
            </span>
            <span>
              Max: <strong>${filters.priceMax}</strong>
            </span>
          </div>
          <input
            type="range"
            className="price-slider"
            min={0}
            max={1000}
            step={10}
            value={filters.priceMax}
            onChange={(e) =>
              onFilterChange({ ...filters, priceMax: Number(e.target.value) })
            }
            aria-label={`Maximum price: $${filters.priceMax}`}
            aria-valuemin={0}
            aria-valuemax={1000}
            aria-valuenow={filters.priceMax}
          />
        </div>
      </section>

      {/* Minimum Rating */}
      <section className="sidebar-section">
        <h2 className="sidebar-heading">Customer Rating</h2>
        <ul className="filter-list" role="group" aria-label="Filter by minimum rating">
          {RATINGS.map((rating) => {
            const id = `rating-${rating}`;
            const checked = filters.minRating === rating;
            return (
              <li key={rating} className="filter-list-item">
                <input
                  type="radio"
                  id={id}
                  name="minRating"
                  checked={checked}
                  onChange={() =>
                    onFilterChange({ ...filters, minRating: checked ? 0 : rating })
                  }
                  style={{ accentColor: "var(--accent-dark)", width: "14px", height: "14px", flexShrink: 0 }}
                  aria-label={`${rating} stars and above`}
                />
                <label htmlFor={id} style={{ gap: "6px" }}>
                  <span style={{ display: "flex", gap: "2px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} filled={s <= rating} />
                    ))}
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>& up</span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Colors */}
      <section className="sidebar-section">
        <h2 className="sidebar-heading">Colour</h2>
        <div className="color-swatches" role="group" aria-label="Filter by colour">
          {COLOR_SWATCHES.map((color) => (
            <button
              key={color.name}
              className="color-swatch"
              title={color.name}
              aria-label={`Filter by colour: ${color.name}`}
              style={{
                background: color.hex,
                borderColor: color.border,
                outline: "1.5px solid var(--border)",
                outlineOffset: "2px",
              }}
              onClick={() => {/* colour filter */}}
            />
          ))}
        </div>
      </section>

      {/* Availability */}
      <section className="sidebar-section">
        <h2 className="sidebar-heading">Availability</h2>
        <ul className="filter-list" role="group" aria-label="Filter by availability">
          {["In Stock", "Out of Stock", "Pre-order"].map((opt) => {
            const id = `avail-${opt.replace(/\s/g, "")}`;
            return (
              <li key={opt} className="filter-list-item">
                <input type="checkbox" id={id} aria-label={opt} />
                <label htmlFor={id}>{opt}</label>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
}
