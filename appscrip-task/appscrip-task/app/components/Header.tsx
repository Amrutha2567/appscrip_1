"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = ["Shop", "Stories", "About", "Contact Us"];
const SUBNAV_LINKS = [
  "MENSTYLE",
  "JEWELLERY",
  "ELECTRONICS",
  "KIDS",
  "WOMEN",
  "HOME & LIVING",
  "BEAUTY",
];

export default function Header() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="site-header" role="banner">
      {/* Announcement bar */}
      <div className="announcement-bar" role="note" aria-label="Announcement">
        <span>Free shipping on orders over $50</span>
        <a href="#">Shop Now →</a>
        <span>New arrivals every Monday</span>
      </div>

      {/* Main header row */}
      <div className="header-top">
        {/* Mobile hamburger */}
        <button
          className="icon-btn"
          aria-label="Open navigation menu"
          style={{ display: "none" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="header-logo" aria-label="DÉCOUVRIR home">
          DÉ<em>COUVRIR</em>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation">
          <ul className="header-nav">
            {NAV_LINKS.map((label) => (
              <li key={label}>
                <Link href="#" aria-current={label === "Shop" ? "page" : undefined}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <form
            className="search-form"
            role="search"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Search products"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              className="search-input"
              placeholder="Search products…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Search products"
            />
          </form>

          <button className="icon-btn" aria-label="Saved items / Wishlist">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 15s-7-4.5-7-9a4 4 0 0 1 7-2.64A4 4 0 0 1 16 6c0 4.5-7 9-7 9z" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>

          <button className="icon-btn" aria-label="User account">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
              <path d="M2.5 16c0-3.31 2.91-6 6.5-6s6.5 2.69 6.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>

          <button className="icon-btn" aria-label="Shopping cart, 3 items">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 2h2l2.5 9h7l2-6H5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8" cy="15" r="1" fill="currentColor" />
              <circle cx="13" cy="15" r="1" fill="currentColor" />
            </svg>
            <span className="cart-count" aria-label="3 items in cart">3</span>
          </button>

          <button className="icon-btn" aria-label="Language: English">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
              <path d="M8 2c0 0-3 2.5-3 6s3 6 3 6M8 2c0 0 3 2.5 3 6s-3 6-3 6M2 8h12" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <span style={{ fontSize: "0.75rem", marginLeft: "3px" }}>ENG</span>
          </button>
        </div>
      </div>

      {/* Sub navigation */}
      <nav className="header-subnav" aria-label="Category navigation">
        {SUBNAV_LINKS.map((label, i) => (
          <Link
            key={label}
            href="#"
            className={`subnav-link${i === 4 ? " active" : ""}`}
            aria-current={i === 4 ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
