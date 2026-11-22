import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, MessageCircle, MessageSquare, Ruler, Scissors, Package, Users } from "lucide-react";
import CountUp from "../../components/CountUp";
import SmartImg from "../../components/SmartImg";
import BackButton from "../../components/BackButton";
import { config } from "../../config";
import { ph } from "../../utils/img";
import { openWA, tailorMessage } from "../../utils/whatsapp";
import "./TailorOrder.css";

// ✏️ Replace these 4 with real shop photos, e.g. "/images/shop1.jpg"
const shop = ["Our Shop", "Fabric Wall", "Stitching Studio", "Fitting Corner"].map((l, i) => ph(l, "#0B6E6E", "#E6F4F1", i));
const steps = [
  { Icon: MessageSquare, t: "Share your idea", d: "Tell us the design on WhatsApp." },
  { Icon: Ruler, t: "Measurements", d: "We take or collect your measurements." },
  { Icon: Scissors, t: "Stitching", d: "Our tailors stitch with care." },
  { Icon: Package, t: "Delivery", d: "Delivered through a delivery service." },
];
const empty = { name: "", phone: "", type: "", desc: "", date: "" };

export default function TailorOrder() {
  const [i, setI] = useState(0);
  const [f, setF] = useState(empty);
  const [errs, setErrs] = useState({});
  const sx = useRef(null);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % shop.length), 3500); return () => clearInterval(t); }, []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name";
    if (!/^[0-9+\s-]{8,15}$/.test(f.phone.trim())) er.phone = "Enter a valid phone number";
    if (!f.type.trim()) er.type = "Tell us the dress type";
    if (f.desc.trim().length < 5) er.desc = "Add a short description";
    setErrs(er);
    if (Object.keys(er).length) return;
    const api = import.meta.env.VITE_API_URL;
    if (api) fetch(`${api}/api/enquiries`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }).catch(() => {});
    openWA(tailorMessage(f));
  };
  const Field = ({ k, label, ...p }) => (
    <label className="fld"><span>{label}</span><input value={f[k]} onChange={set(k)} aria-invalid={!!errs[k]} {...p} />{errs[k] && <em role="alert">{errs[k]}</em>}</label>
  );
  return (
    <div className="to">
      <div className="wrap"><BackButton /></div>
      <section className="wrap sec">
        <h1 className="h2">Tailor Order</h1>
        <div className="slider" onTouchStart={(e) => (sx.current = e.touches[0].clientX)} onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - sx.current; if (Math.abs(dx) > 40) setI((v) => (v + (dx < 0 ? 1 : -1) + shop.length) % shop.length); }}>
          <div className="slides" style={{ transform: `translateX(-${i * 100}%)` }}>{shop.map((s, k) => <div className="slide" key={k}><SmartImg src={s} alt={`Shop photo ${k + 1}`} ratio="4/3" /></div>)}</div>
          <div className="dots">{shop.map((_, k) => <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} />)}</div>
        </div>
        <div className="to-desc">
          <p><Truck size={20} /> Your tailor orders are <b>delivered through a delivery service</b> right to your door.</p>
          <p><MapPin size={20} /> {config.address}</p>
          <a className="btn ghost" href={config.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} color="#e11d2e" /> View shop on map</a>
        </div>
      </section>

      <section className="sec tint"><div className="wrap">
        <h2 className="h2">Chat with us</h2>
        <form className="chat" onSubmit={submit} noValidate>
          <Field k="name" label="Your name" autoComplete="name" />
          <Field k="phone" label="Phone number" type="tel" autoComplete="tel" />
          <Field k="type" label="Dress type (e.g. blouse, lehenga)" />
          <label className="fld"><span>Description</span><textarea rows="3" maxLength={500} value={f.desc} onChange={set("desc")} aria-invalid={!!errs.desc} />{errs.desc && <em role="alert">{errs.desc}</em>}</label>
          <Field k="date" label="Preferred date (optional)" type="date" />
          <button className="btn wa block" type="submit"><MessageCircle size={18} /> Continue on WhatsApp</button>
          <small>Your message opens in WhatsApp. We confirm the order with you there.</small>
        </form>
      </div></section>

      <section className="sec wrap">
        <div className="stats">
          <div><b><CountUp to={config.yearsExperience} /></b><span>Years of Experience</span></div>
          <div><b><CountUp to={config.teamCount} suffix="" /></b><span>Team Members</span></div>
          <div><b><CountUp to={config.ordersCompleted} /></b><span>Orders Completed</span></div>
        </div>
        <h2 className="h2" style={{ marginTop: 44 }}>Meet the Team</h2>
        <div className="team">{config.team.map((m, k) => (
          <motion.div key={k} className="member" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.1 }}>
            <div className="avatar"><Users /></div><b>{m.name}</b><small>{m.role}</small>
          </motion.div>))}</div>
      </section>

      <section className="sec tint"><div className="wrap">
        <h2 className="h2">How it works</h2>
        <ol className="steps">{steps.map(({ Icon, t, d }, k) => (
          <motion.li key={t} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.12 }}>
            <span className="num"><Icon size={20} /></span><div><b>{k + 1}. {t}</b><p>{d}</p></div>
          </motion.li>))}</ol>
      </div></section>
    </div>
  );
}
