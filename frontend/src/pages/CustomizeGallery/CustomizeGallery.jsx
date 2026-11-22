import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import SmartImg from "../../components/SmartImg";
import BackButton from "../../components/BackButton";
import { designs } from "../../data/designs";
import "./CustomizeGallery.css";

export default function CustomizeGallery() {
  const [q, setQ] = useState("");
  const list = designs.filter((d) => d.name.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div className="wrap cg">
      <BackButton />
      <h1 className="h2" style={{ marginTop: 20 }}>Customize Gallery</h1>
      <div className="cg-search"><Search size={18} /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search designs…" aria-label="Search designs" /></div>
      {list.length ? <div className="cg-grid">{list.map((d, i) => (
        <motion.div key={d.id} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}>
          <Link to={`/customize/${d.id}`} className="card cg-card"><SmartImg src={d.images[0]} alt={d.name} /><h3 className="card-name">{d.name}</h3><p className="cg-mat">{d.materials}</p></Link>
        </motion.div>))}</div> : <p className="cg-empty">No designs found.</p>}
    </div>
  );
}
