import { useState } from "react";
import "./SmartImg.css";
// Image with skeleton while loading, fallback on error, fade-in on success.
export default function SmartImg({ src, alt, ratio = "3/4", eager = false, className = "" }) {
  const [st, setSt] = useState("load");
  return (
    <div className={`simg ${className}`} style={{ aspectRatio: ratio }}>
      {st === "load" && <div className="skel simg-fill" />}
      {st === "err" ? <div className="simg-err">Image unavailable</div> : (
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onLoad={() => setSt("ok")} onError={() => setSt("err")} style={{ opacity: st === "ok" ? 1 : 0 }} />
      )}
    </div>
  );
}
