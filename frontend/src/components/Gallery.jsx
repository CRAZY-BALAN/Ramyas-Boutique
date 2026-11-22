import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import SmartImg from "./SmartImg";
import Zoomable from "./Zoomable";
import "./Gallery.css";

// Thumbnails + swipe (mobile) + hover magnifier (desktop) + fullscreen pinch/double-tap/drag zoom.
export default function Gallery({ images, alt }) {
  const [i, setI] = useState(0);
  const [box, setBox] = useState(false);
  const [lens, setLens] = useState(null);
  const sx = useRef(null);
  const n = images.length;
  const go = (d) => setI((v) => (v + d + n) % n);
  useEffect(() => setI(0), [images]);
  useEffect(() => {
    if (!box) return;
    const k = (e) => { if (e.key === "Escape") setBox(false); if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [box]);
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); setLens({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); };
  return (
    <div className="gal">
      <div className="gal-thumbs" role="tablist" aria-label="Image thumbnails">
        {images.map((s, k) => (
          <button key={k} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Image ${k + 1}`}><SmartImg src={s} alt="" /></button>
        ))}
      </div>
      <div className="gal-main"
        onTouchStart={(e) => (sx.current = e.touches[0].clientX)}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - sx.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); }}
        onMouseMove={move} onMouseLeave={() => setLens(null)}>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setBox(true)} style={{ cursor: "zoom-in" }}>
            <SmartImg src={images[i]} alt={`${alt} – view ${i + 1} of ${n}`} eager />
          </motion.div>
        </AnimatePresence>
        {lens && <div className="gal-lens" style={{ backgroundImage: `url("${images[i]}")`, backgroundPosition: `${lens.x}% ${lens.y}%` }} />}
        <button className="gal-zoom" onClick={() => setBox(true)} aria-label="Zoom image"><ZoomIn size={18} /></button>
        {n > 1 && <>
          <button className="gal-arrow l" onClick={() => go(-1)} aria-label="Previous image"><ChevronLeft /></button>
          <button className="gal-arrow r" onClick={() => go(1)} aria-label="Next image"><ChevronRight /></button>
          <div className="gal-dots">{images.map((_, k) => <span key={k} className={k === i ? "on" : ""} />)}</div>
        </>}
      </div>
      <AnimatePresence>
        {box && (
          <motion.div className="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Image viewer">
            <button className="lb-x" onClick={() => setBox(false)} aria-label="Close"><X /></button>
            <Zoomable key={i} src={images[i]} alt={alt} />
            {n > 1 && <>
              <button className="gal-arrow l" onClick={() => go(-1)} aria-label="Previous"><ChevronLeft /></button>
              <button className="gal-arrow r" onClick={() => go(1)} aria-label="Next"><ChevronRight /></button>
            </>}
            <p className="lb-hint">Pinch, scroll or double-tap to zoom · drag to move</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
