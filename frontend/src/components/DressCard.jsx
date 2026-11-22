import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import SmartImg from "./SmartImg";
import { useWishlist } from "../hooks/useWishlist";
import "./DressCard.css";

export default function DressCard({ d, i = 0 }) {
  const { has, toggle } = useWishlist();
  const fav = has(d.id);
  return (
    <motion.article className="card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}>
      <Link to={`/dress/${d.id}`} className="card-link" aria-label={`View ${d.name}`}>
        <div className="card-img">
          <SmartImg src={d.images[0]} alt={d.name} />
          {d.isNew && <span className="tag">New</span>}
        </div>
        <h3 className="card-name">{d.name}</h3>
        {d.price && <p className="card-price">₹{d.price.toLocaleString("en-IN")}</p>}
      </Link>
      <button className={`heart ${fav ? "on" : ""}`} onClick={() => toggle(d.id)} aria-pressed={fav} aria-label={fav ? "Remove from wishlist" : "Add to wishlist"}><Heart size={18} fill={fav ? "currentColor" : "none"} /></button>
    </motion.article>
  );
}
