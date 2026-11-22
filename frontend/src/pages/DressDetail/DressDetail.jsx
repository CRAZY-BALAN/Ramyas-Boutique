import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Ruler, Share2 } from "lucide-react";
import Gallery from "../../components/Gallery";
import SizeChart from "../../components/SizeChart";
import DressCard from "../../components/DressCard";
import BackButton from "../../components/BackButton";
import NotFound from "../NotFound/NotFound";
import { dresses } from "../../data/dresses";
import { openWA, dressMessage } from "../../utils/whatsapp";
import { pushRecent } from "../../utils/storage";
import { useWishlist } from "../../hooks/useWishlist";
import "./DressDetail.css";

export default function DressDetail() {
  const { id } = useParams();
  const d = dresses.find((x) => x.id === id);
  const [size, setSize] = useState(null);
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(0);
  const [chart, setChart] = useState(false);
  const { has, toggle } = useWishlist();
  useEffect(() => { setSize(null); setErr(false); if (d) pushRecent(d.id); }, [id]);
  if (!d) return <NotFound msg="We couldn’t find that dress." />;

  const order = () => { if (!size) { setErr(true); setShake((s) => s + 1); return; } openWA(dressMessage(d, size)); };
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) { try { await navigator.share({ title: d.name, url }); } catch {} } else openWA(`Look at this dress from Ramya’s Boutique: ${d.name}\n${url}`);
  };
  const related = dresses.filter((x) => x.category === d.category && x.id !== d.id).concat(dresses.filter((x) => x.category !== d.category && x.id !== d.id)).slice(0, 4);

  return (
    <div className="wrap dd">
      <div className="crumbs"><BackButton /><nav aria-label="Breadcrumb"><Link to="/">Home</Link> / {d.category} / {d.name}</nav></div>
      <div className="dd-grid">
        <Gallery images={d.images} alt={d.name} />
        <div className="dd-info">
          <h1>{d.name}</h1>
          {d.price && <p className="dd-price">₹{d.price.toLocaleString("en-IN")}</p>}
          <p className="dd-desc">{d.description}</p>
          <dl className="dd-meta"><dt>Fabric</dt><dd>{d.fabric}</dd><dt>Care</dt><dd>{d.care}</dd></dl>

          <div className="dd-sizes-head"><strong>Select size</strong><button onClick={() => setChart(true)}><Ruler size={16} /> Size Chart</button></div>
          <div key={shake} className={`sizes ${shake ? "shake" : ""}`} role="radiogroup" aria-label="Size">
            {d.sizes.map((s) => (
              <button key={s.size} role="radio" aria-checked={size === s.size} disabled={!s.available} className={`size ${size === s.size ? "on" : ""}`} onClick={() => { setSize(s.size); setErr(false); }}>{s.size}</button>
            ))}
          </div>
          {err && <p className="dd-err" role="alert">Please choose a size to continue.</p>}

          <details className="dd-prev"><summary>Preview WhatsApp message</summary><pre>{dressMessage(d, size || "(select size)")}</pre></details>
          <div className="dd-actions">
            <button className="btn wa block" onClick={order}><MessageCircle size={18} /> Order on WhatsApp</button>
            <button className="icon-btn" onClick={() => toggle(d.id)} aria-pressed={has(d.id)} aria-label="Wishlist" style={{ color: has(d.id) ? "#e11d48" : undefined }}><Heart fill={has(d.id) ? "currentColor" : "none"} /></button>
            <button className="icon-btn" onClick={share} aria-label="Share this dress"><Share2 /></button>
          </div>
          <p className="dd-note">Your order is confirmed with us directly on WhatsApp. No online payment on this site.</p>
        </div>
      </div>

      <section className="dd-rel"><h2 className="h2">You may also like</h2><div className="grid">{related.map((r, i) => <DressCard key={r.id} d={r} i={i} />)}</div></section>

      <div className="dd-bar"><div><small>{d.name}</small><b>{d.price ? `₹${d.price.toLocaleString("en-IN")}` : ""}{size ? ` · ${size}` : ""}</b></div><button className="btn wa" onClick={order}><MessageCircle size={18} /> Order</button></div>
      <AnimatePresence>{chart && <SizeChart rows={d.sizeChart} onClose={() => setChart(false)} />}</AnimatePresence>
    </div>
  );
}
