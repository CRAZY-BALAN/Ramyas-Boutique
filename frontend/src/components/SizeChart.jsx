import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import "./SizeChart.css";

export default function SizeChart({ rows, onClose }) {
  const [unit, setUnit] = useState("cm");
  useEffect(() => { const k = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);
  const v = (n) => (unit === "cm" ? n : (n / 2.54).toFixed(1));
  return (
    <motion.div className="sc-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="sc" role="dialog" aria-modal="true" aria-label="Size chart" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "tween", duration: 0.3 }} onClick={(e) => e.stopPropagation()}>
        <div className="sc-head"><h3>Size Chart</h3>
          <div className="sc-toggle" role="group" aria-label="Unit">{["cm", "in"].map((u) => <button key={u} className={unit === u ? "on" : ""} onClick={() => setUnit(u)}>{u}</button>)}</div>
          <button onClick={onClose} aria-label="Close"><X /></button></div>
        {rows?.length ? (
          <div className="sc-scroll"><table>
            <thead><tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hip</th><th>Shoulder</th><th>Length</th></tr></thead>
            <tbody>{rows.map((r) => <tr key={r.size}><th>{r.size}</th><td>{v(r.bust)}</td><td>{v(r.waist)}</td><td>{v(r.hip)}</td><td>{v(r.shoulder)}</td><td>{v(r.length)}</td></tr>)}</tbody>
          </table></div>
        ) : <p>Size chart not available. Please ask us on WhatsApp.</p>}
        <div className="sc-tip"><strong>How to measure</strong>
          <ul><li><b>Bust:</b> around the fullest part of the chest.</li><li><b>Waist:</b> around the natural waistline.</li><li><b>Hip:</b> around the fullest part of the hips.</li><li><b>Shoulder:</b> across the back, shoulder tip to tip.</li><li><b>Length:</b> shoulder down to the hem.</li></ul>
          <p>Measurements are in {unit === "cm" ? "centimetres" : "inches"}. Not sure? Choose Tailor Order and we will take your measurements.</p></div>
      </motion.div>
    </motion.div>
  );
}
