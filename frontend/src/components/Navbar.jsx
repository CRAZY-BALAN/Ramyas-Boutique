
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  MoreVertical,
  X,
  MessageCircle,
  Instagram,
  MapPin,
  Heart,
} from "lucide-react";

import Logo from "./Logo";
import { config } from "../config";
import { waLink } from "../utils/whatsapp";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { pathname } = useLocation();

  const drawerRef = useRef(null);
  const dotsRef = useRef(null);

  // Close menu after navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Handle scroll and Escape key
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        open &&
        !drawerRef.current?.contains(e.target) &&
        !dotsRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );
    };
  }, [open]);

  // Location button
  const goLocation = () => {
    setOpen(false);

    document
      .getElementById("location")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Navigation items
  const items = (
    <>
      <NavLink to="/" end onClick={() => setOpen(false)}>
        Home
      </NavLink>

      <NavLink
        to="/tailor-order"
        onClick={() => setOpen(false)}
      >
        Tailor Order
      </NavLink>

      <NavLink
        to="/customize"
        onClick={() => setOpen(false)}
      >
        Customize Gallery
      </NavLink>

      <NavLink
        to="/wishlist"
        onClick={() => setOpen(false)}
      >
        <Heart size={16} />
        Wishlist
      </NavLink>

      <a
        href={waLink("Hello Ramya’s Boutique! I have an enquiry.")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpen(false)}
      >
        <MessageCircle size={16} />
        WhatsApp
      </a>

      <a
        href={config.instagram}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpen(false)}
      >
        <Instagram size={16} />
        Instagram
      </a>

      <button onClick={goLocation}>
        <MapPin size={16} />
        Location
      </button>
    </>
  );

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>

      <div className="wrap nav-in">

        {/* Main logo - only shown in header */}
        <Link to="/" aria-label="Ramya’s Boutique home">
          <Logo size="sm" />
        </Link>

        {/* Desktop navigation */}
        <nav className="nav-links" aria-label="Main">
          {items}
        </nav>

        {/* Three-dot menu button - always visible */}
        <button
          ref={dotsRef}
          type="button"
          className="nav-dots"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} /> : <MoreVertical size={24} />}
        </button>

      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background overlay */}
            <motion.div
              className="drawer-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Navigation drawer */}
            <motion.aside
              ref={drawerRef}
              className="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.28,
              }}
            >
              {/* No duplicate logo here */}
              <nav aria-label="Mobile">
                {items}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}
