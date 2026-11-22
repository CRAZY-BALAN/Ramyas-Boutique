import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Scissors, Sparkles, Truck } from "lucide-react";
import Logo from "../../components/Logo";
import DressCard from "../../components/DressCard";
import { dresses } from "../../data/dresses";
import { config } from "../../config";
import { getRecent } from "../../utils/storage";
import "./Home.css";

const why = [
  { Icon: Scissors, t: "Made to measure", d: "Every outfit is stitched to your measurements." },
  { Icon: Sparkles, t: "Beautiful fabrics", d: "Silks, georgettes, brocades and more." },
  { Icon: Truck, t: "Delivered to you", d: "Orders are delivered via delivery service." },
];

export default function Home() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const cats = useMemo(() => ["All", ...new Set(dresses.map((d) => d.category))], []);
  const list = dresses.filter((d) => (cat === "All" || d.category === cat) && d.name.toLowerCase().includes(q.trim().toLowerCase()));
  const recent = getRecent().map((id) => dresses.find((d) => d.id === id)).filter(Boolean).slice(0, 4);
  return (
    <>
      <section className="hero">
        {[8, 22, 37, 52, 68, 83].map((l, i) => <i key={i} className="thread" style={{ left: `${l}%`, animationDelay: `${i * 0.7}s`, animationDuration: `${6 + (i % 3) * 2}s` }} />)}
        <div className="wrap hero-in">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}><Logo size="lg" /></motion.div>
          <motion.p className="hero-tag" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>Elegance, stitched to you.</motion.p>
          <motion.div className="hero-btns" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <a className="btn" href="#collection" onClick={(e) => { e.preventDefault(); document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }); }}>Explore Collection</a>
            <Link className="btn ghost" to="/tailor-order">Tailor Order</Link>
          </motion.div>
        </div>
        <svg className="wave" viewBox="0 0 2400 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 Q150 0 300 40 T600 40 T900 40 T1200 40 T1500 40 T1800 40 T2100 40 T2400 40 V80 H0Z" /></svg>
      </section>

      <div className="marquee" aria-hidden="true"><div>{[...config.fabrics, ...config.fabrics, ...config.fabrics].map((f, i) => <span key={i}>✦ {f}</span>)}</div></div>

      <section className="sec" id="collection">
        <div className="wrap">
          <h2 className="h2">Our Collection</h2>
          <div className="search"><Search size={18} /><input type="search" placeholder="Search dresses…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search dresses" /></div>
          <div className="chips" role="group" aria-label="Categories">{cats.map((c) => <button key={c} className={c === cat ? "on" : ""} onClick={() => setCat(c)}>{c}</button>)}</div>
          {list.length ? <div className="grid">{list.map((d, i) => <DressCard key={d.id} d={d} i={i} />)}</div> : <p className="empty">No dresses match your search.</p>}
        </div>
      </section>

      {recent.length > 0 && (
        <section className="sec tint"><div className="wrap"><h2 className="h2">Recently Viewed</h2><div className="grid">{recent.map((d, i) => <DressCard key={d.id} d={d} i={i} />)}</div></div></section>
      )}

      <section className="sec tint">
        <div className="wrap">
          <h2 className="h2">Why Ramya’s Boutique</h2>
          <div className="why">{why.map(({ Icon, t, d }, i) => (
            <motion.div key={t} className="why-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <span><Icon /></span><h3>{t}</h3><p>{d}</p>
            </motion.div>))}</div>
        </div>
      </section>
    </>
  );
}
