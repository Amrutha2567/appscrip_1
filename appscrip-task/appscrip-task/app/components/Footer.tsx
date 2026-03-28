import Link from "next/link";

const SHOP_LINKS = ["New Arrivals", "Women", "Men", "Kids", "Jewellery", "Electronics", "Sale"];
const HELP_LINKS = ["FAQ", "Shipping & Returns", "Size Guide", "Track Order", "Contact Us"];
const ABOUT_LINKS = ["Our Story", "Sustainability", "Careers", "Press", "Affiliates"];

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-grid">
        {/* Brand column */}
        <div>
          <h2 className="footer-brand">
            DÉ<em>COUVRIR</em>
          </h2>
          <p className="footer-tagline">
            Curating the best in women's fashion since 2018. Quality pieces that
            last a lifetime, sourced with care from independent designers.
          </p>
          <form
            className="footer-newsletter"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              className="footer-email-input"
              placeholder="Enter your email"
              aria-label="Email address for newsletter"
              required
            />
            <button type="submit" className="footer-subscribe-btn">
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="footer-col-heading">Shop</h3>
          <ul className="footer-links">
            {SHOP_LINKS.map((link) => (
              <li key={link}>
                <Link href="#" aria-label={`Shop ${link}`}>{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help links */}
        <div>
          <h3 className="footer-col-heading">Help</h3>
          <ul className="footer-links">
            {HELP_LINKS.map((link) => (
              <li key={link}>
                <Link href="#" aria-label={link}>{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About links */}
        <div>
          <h3 className="footer-col-heading">About</h3>
          <ul className="footer-links">
            {ABOUT_LINKS.map((link) => (
              <li key={link}>
                <Link href="#" aria-label={link}>{link}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} DÉCOUVRIR. All rights reserved.
        </p>
        <nav className="footer-socials" aria-label="Social media links">
          {[
            { label: "Instagram", icon: "IG" },
            { label: "Pinterest", icon: "PT" },
            { label: "Twitter / X", icon: "X" },
            { label: "Facebook", icon: "FB" },
          ].map(({ label, icon }) => (
            <a
              key={label}
              href="#"
              className="social-link"
              aria-label={`Follow us on ${label}`}
              rel="noopener noreferrer"
            >
              <span aria-hidden="true" style={{ fontSize: "9px", fontWeight: 600 }}>
                {icon}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
