import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ textAlign: "center", padding: "6rem 2rem", fontFamily: "'DM Sans', sans-serif" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 400, marginBottom: "1rem" }}>
        Page Not Found
      </h1>
      <p style={{ color: "#8a847e", marginBottom: "1.5rem" }}>
        The page you are looking for does not exist.
      </p>
      <Link href="/" style={{ color: "#9e7a46", textDecoration: "underline" }}>
        Back to Products
      </Link>
    </main>
  );
}
