import React from "react";
import { Link } from "react-router-dom";

import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer__wrapper">
      <div className="footer__el">
        <p></p>
      </div>
      <Link className="footer__link" to="/pizzas-app/cart">
        OPEN CART →
      </Link>
    </div>
  );
};

export default Footer;
