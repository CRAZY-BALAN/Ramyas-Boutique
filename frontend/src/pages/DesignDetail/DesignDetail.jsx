import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import Gallery from "../../components/Gallery";
import BackButton from "../../components/BackButton";
import SmartImg from "../../components/SmartImg";
import NotFound from "../NotFound/NotFound";
import { designs } from "../../data/designs";
import { designMessage, openWA } from "../../utils/whatsapp";
import "./DesignDetail.css";

export default function DesignDetail() {
  const { id } = useParams();
  const d = designs.find((x) => x.id === id);
  const [req, setReq] = useState("");
  if (!d) return <NotFound msg="We couldn’t find that design." />;
  return (
    <div className="wrap ddt">
      <BackButton label="Back to gallery" />
      <div className="ddt-grid">
        <Gallery images={d.images} alt={d.name} />
        <div>
          <h1>{d.name}</h1>
          <p className="ddt-p">{d.description}</p>
          <dl className="ddt-meta"><dt>Materials used</dt><dd>{d.materials}</dd></dl>
          <label className="ddt-req"><span>Your customisation request (optional)</span>
            <textarea rows="3" maxLength={300} value={req} onChange={(e) => setReq(e.target.value)} placeholder="Colour, fabric, neck style, measurements…" />
            <small>{req.length}/300</small></label>
          <button className="btn wa block" onClick={() => openWA(designMessage(d, req.trim()))}><MessageCircle size={18} /> Chat on WhatsApp about this design</button>
          <p className="ddt-note">Photos are design references. We will confirm price and timeline on WhatsApp.</p>
        </div>
      </div>
      <h2 className="h2" style={{ marginTop: 50 }}>More designs</h2>
      <div className="ddt-rel">{designs.filter((x) => x.id !== d.id).slice(0, 3).map((x) => (
        <Link key={x.id} to={`/customize/${x.id}`} className="card"><SmartImg src={x.images[0]} alt={x.name} /><h3 className="card-name" style={{ paddingBottom: 12 }}>{x.name}</h3></Link>))}</div>
    </div>
  );
}
