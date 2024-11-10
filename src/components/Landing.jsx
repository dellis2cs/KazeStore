import "../styles/Landing.css";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landingBackground">
      <Header />
      <div className="landingContainer">
        {/* Hero Section */}
        <section className="heroSection">
          <div className="heroContent">
            <h1>Welcome to Kaze</h1>
            <p>Your one-stop shop for the latest and greatest products.</p>
            <Link to="/shop" className="ctaButton">Shop Now</Link>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefitsSection">
          <h2>Why Shop with Us?</h2>
          <div className="benefitsGrid">
            <div className="benefitCard">
              <p>🚚 Free Shipping on Orders Over $50</p>
            </div>
            <div className="benefitCard">
              <p>💳 Easy & Secure Payment</p>
            </div>
            <div className="benefitCard">
              <p>✨ Exclusive Deals & Offers</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
