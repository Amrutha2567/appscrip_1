import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DÉCOUVRIR — Women's Fashion & Clothing",
  description:
    "Discover curated women's fashion — tops, dresses, jewellery and more. Filter by category, price, and style to find your perfect look. Free shipping on orders over $50.",
  keywords:
    "women's clothing, fashion, tops, dresses, jewellery, online shopping",
  openGraph: {
    title: "DÉCOUVRIR — Women's Fashion & Clothing",
    description: "Curated women's fashion with advanced filters and fast delivery.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
