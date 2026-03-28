import type { Product } from "../types/product";

const API_BASE = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`, {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/products/categories`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  return res.json();
}

export function buildProductSchema(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Product Listing",
    description: "Browse our complete collection of products",
    numberOfItems: products.length,
    itemListElement: products.slice(0, 10).map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Product",
        name: p.title,
        image: p.image,
        description: p.description,
        offers: {
          "@type": "Offer",
          price: p.price.toFixed(2),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: p.rating.rate,
          reviewCount: p.rating.count,
        },
      },
    })),
  };
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
