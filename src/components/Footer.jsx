import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <img
        src={require("../assets/images/LittleLemonLogo.png")}
        alt="little lemon logo"
      />

      <div>
        <h3>Doormat Navigation</h3>
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>About</Link>
          <Link
            to={"/#highlights-section"}
            onClick={() =>
              document
                .getElementById("highlights-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Menu
          </Link>
          <Link to={"/"}>Reservations</Link>
          <Link to={"/"}>Order Online</Link>
          <Link to={"/"}>Login</Link>
        </nav>
      </div>

      <div>
        <h3>Contact</h3>
        <ul>
          <li>address</li>
          <li>phone number</li>
          <li>email</li>
        </ul>
      </div>

      <div className="socials">
        <h3>Social Media</h3>
        <div>
          <a href="#">
            <img
              src={require("../assets/images/facebook-f.svg").default}
              alt="facebook by meta"
            />
          </a>
          <a href="#">
            <img
              src={require("../assets/images/instagram.svg").default}
              alt="instagram by meta"
            />
          </a>
          <a href="#">
            <img
              src={require("../assets/images/linkedin-in.svg").default}
              alt="LinkedIn"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
