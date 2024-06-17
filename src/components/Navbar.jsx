import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LLLogo from "../assets/images/LittleLemonLogo.png";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Hide,
  Show,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import "../styles/Navbar.scss";

export default function Navbar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

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
    <>
      <Show above="lg">
        <nav id="navigation-top" className={hidden ? "hidden" : ""}>
          <ul>
            <li className="logo" tabIndex="0">
              <Link to={"/"}>
                <img src={LLLogo} alt="Little Lemon Logo" loading="lazy" />
              </Link>
            </li>
            <li tabIndex="0">
              <Link to={"/"} className={getClassName("/")}>
                Home
              </Link>
            </li>
            <li tabIndex="0">
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
            <li tabIndex="0">
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
            <li tabIndex="0">
              <Link
                to={"/reservations"}
                className={getClassName("/reservations")}
              >
                Reservations
              </Link>
            </li>
            <li tabIndex="0">
              <a href="#">Order Online</a>
            </li>
            <li tabIndex="0">
              <a href="#">Login</a>
            </li>
          </ul>
        </nav>
      </Show>

      <Hide above="lg">
        <div id="burger-menu">
          <FontAwesomeIcon
            icon={faBars}
            size="2xl"
            onClick={isOpen ? () => onClose() : () => onOpen()}
          />
        </div>
      </Hide>

      <Drawer
        id="navigation-mobile"
        placement={"left"}
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <FontAwesomeIcon icon={faXmark} onClick={onClose} />
          </DrawerHeader>
          <DrawerBody>
            <nav>
              <ul>
                <li tabIndex="0">
                  <Link
                    to={"/"}
                    className={getClassName("/")}
                    onClick={() => onClose()}
                  >
                    Home
                  </Link>
                </li>
                <li tabIndex="0">
                  <Link
                    to={"/#about-section"}
                    className={getClassName("/#about-section")}
                    onClick={() => {
                      document
                        .getElementById("about-section")
                        .scrollIntoView({ behavior: "smooth" });
                      onClose();
                    }}
                  >
                    About
                  </Link>
                </li>
                <li tabIndex="0">
                  <Link
                    to={"/#about-section"}
                    className={getClassName("/#highlights-section")}
                    onClick={() => {
                      document
                        .getElementById("highlights-section")
                        .scrollIntoView({ behavior: "smooth" });
                      onClose();
                    }}
                  >
                    Menu
                  </Link>
                </li>
                <li tabIndex="0">
                  <Link
                    to={"/reservations"}
                    className={getClassName("/reservations")}
                    onClick={() => onClose()}
                  >
                    Reservations
                  </Link>
                </li>
                <li tabIndex="0">
                  <Link to={"/"} onClick={() => onClose()}>
                    Order Online
                  </Link>
                </li>
                <li tabIndex="0">
                  <Link to={"/"} onClick={() => onClose()}>
                    Login
                  </Link>
                </li>
              </ul>
            </nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
