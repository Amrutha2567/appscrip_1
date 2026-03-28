"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "../types/product";
import { slugify } from "../lib/api";

interface ProductCardProps {
  product: Product;
}

function StarRating({ rate, count }: { rate: number; count: number }) {
  return (
    <div className="product-rating" aria-label={`Rated ${rate} out of 5 stars by ${count} customers`}>
      <div className="stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} style={{ color: s <= Math.round(rate) ? "var(--accent)" : "var(--border-strong)" }}>
            ★
          </span>
        ))}
      </div>
      <span className="rating-count">({count})</span>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const isNew = product.id % 5 === 0;
  const isSale = product.id % 3 === 0;
  const originalPrice = isSale ? (product.price * 1.25).toFixed(2) : null;

  // SEO-friendly image alt text and filename
  const altText = `${product.title} — ${product.category} product image`;
  const seoSlug = slugify(product.title);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted((w) => !w);
  };

  return (
    <article
      className="product-card"
      tabIndex={0}
      aria-label={`${product.title}, $${product.price}`}
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Hidden schema data */}
      <meta itemProp="name" content={product.title} />
      <meta itemProp="description" content={product.description} />
      <link itemProp="image" href={product.image} />

      <div className="product-image-wrap">
        {/* Badge */}
        {isNew && <span className="product-badge badge-new" aria-label="New arrival">New</span>}
        {isSale && !isNew && <span className="product-badge badge-sale" aria-label="On sale">Sale</span>}

        {/* Wishlist button */}
        <button
          className={`wishlist-btn${wishlisted ? " is-wishlisted" : ""}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          aria-pressed={wishlisted}
        >
          {wishlisted ? "♥" : "♡"}
        </button>

        {/* Product image — using regular img for external URLs from fakestoreapi */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={altText}
          loading="lazy"
          decoding="async"
          data-seo-name={`${seoSlug}-${product.category.replace(/\s+/g, "-")}.jpg`}
          itemProp="image"
        />

        {/* Quick add */}
        <button
          className="quick-add-btn"
          onClick={handleAddToCart}
          aria-label={`Quick add ${product.title} to cart`}
        >
          {addedToCart ? "✓ Added" : "Quick Add"}
        </button>
      </div>

      <div className="product-info">
        <p className="product-category-label" aria-label={`Category: ${product.category}`}>
          {product.category}
        </p>

        <h2 className="product-title" itemProp="name">
          {product.title}
        </h2>

        <p className="product-description" itemProp="description">
          {product.description}
        </p>

        <StarRating rate={product.rating.rate} count={product.rating.count} />

        <div
          className="product-price-row"
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
        >
          <meta itemProp="priceCurrency" content="USD" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
          <span className="product-price" itemProp="price" content={product.price.toString()}>
            ${product.price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="product-price-original" aria-label={`Original price: $${originalPrice}`}>
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
