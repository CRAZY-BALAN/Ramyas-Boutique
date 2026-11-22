import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { waLink } from "../utils/whatsapp";
import "./Extras.css";


export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div className="progress" style={{ scaleX: x }} />;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > 600); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  return show ? <button className="btt" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp /></button> : null;
}

export function FloatingWhatsApp() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/dress/") || pathname.startsWith("/customize/")) return null;
  return <a className="fwa" href={waLink("Hello Ramya’s Boutique! I have an enquiry.")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><MessageCircle /></a>;
}

export function Intro() {
  const [show, setShow] = useState(() => { try { return !sessionStorage.getItem("rb_intro"); } catch { return false; } });
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => { setShow(false); try { sessionStorage.setItem("rb_intro", "1"); } catch {} }, 1900);
    return () => clearTimeout(t);
  }, [show]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="intro" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <svg viewBox="0 0 220 60" className="intro-thread" aria-hidden="true"><path d="M5 40 C40 0 70 60 110 30 S180 5 215 28" /></svg>
          <Logo size="lg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
