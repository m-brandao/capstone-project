import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LLLogo from "../assets/images/LittleLemonLogo.png";

export default function Navbar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const { pathname, hash } = location;
    setActiveLink(`${pathname}${hash}`);
  }, [location]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setHidden(true);
      } else {
        // Scrolling up
        setHidden(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getClassName = (path) => {
    return activeLink === path ? "active" : "";
  };
  return (
    <nav id="navigation-top" className={hidden ? "hidden" : ""}>
      <ul>
        <li className="logo">
          <Link to={"/"}>
            <img src={LLLogo} alt="Little Lemon Logo" loading="lazy" />
          </Link>
        </li>
        <li>
          <Link to={"/"} className={getClassName("/")}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to={"/#about-section"}
            className={getClassName("/#about-section")}
            onClick={() =>
              document
                .getElementById("about-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to={"/#highlights-section"}
            className={getClassName("/#highlights-section")}
            onClick={() =>
              document
                .getElementById("highlights-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Menu
          </Link>
        </li>
        <li>
          <Link to={"/reservations"} className={getClassName("/reservations")}>
            Reservations
          </Link>
        </li>
        <li>
          <a href="#">Order Online</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
      </ul>
    </nav>
  );
}
