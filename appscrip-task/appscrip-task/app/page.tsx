import type { Metadata } from "next";
import { fetchProducts, fetchCategories, buildProductSchema } from "./lib/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductListing from "./components/ProductListing";

// SSR: This page renders server-side on every request
// With `revalidate` in fetch() calls, it uses ISR (Incremental Static Regeneration)
export const metadata: Metadata = {
  title: "Women's Clothing — Shop All | DÉCOUVRIR",
  description:
    "Browse our complete women's collection. Filter by category, price and rating. Free shipping over $50. New arrivals every week.",
  alternates: {
    canonical: "https://decouvrirfashion.netlify.app/",
  },
};

export default async function ProductListingPage() {
  // SSR: Data fetched on the server before sending HTML to client
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  // Build JSON-LD schema for SEO
  const productSchema = buildProductSchema(products);

  return (
    <>
      {/* JSON-LD structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <Header />

      {/* Hero banner — SSR rendered with live product count */}
      <section className="hero-banner" aria-label="Women's collection hero">
        <div className="hero-text">
          <p className="hero-eyebrow">New Season Collection</p>
          <h1 className="hero-title">
            Discover <em>Women's</em>
            <br />
            Fashion
          </h1>
          <p className="hero-subtitle">
            {products.length} curated pieces across {categories.length} categories —
            thoughtfully selected for the modern woman.
          </p>
        </div>
        <span className="hero-count" aria-hidden="true">
          {products.length}
        </span>
      </section>

      {/* Interactive product listing — client component */}
      <ProductListing initialProducts={products} categories={categories} />

      <Footer />
    </>
  );
}
