import { Link } from "react-router-dom";
import { MapPin, Instagram, MessageCircle, Phone, Clock } from "lucide-react";
import Logo from "./Logo";
import { config } from "../config";
import { waLink } from "../utils/whatsapp";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="foot" id="location">
      <div className="foot-stitch" aria-hidden="true" />
      <div className="wrap foot-grid">
        <div><Logo /><p className="foot-about">Custom-stitched dresses, blouses and tailoring, made to fit you.</p></div>
        <div>
          <h3>Visit us</h3>
          <p className="row"><a className="pin" href={config.mapUrl} target="_blank" rel="noopener noreferrer" aria-label="Open shop location in Google Maps"><MapPin /></a><span>{config.address}</span></p>
          <p className="row"><Clock size={18} /><span>{config.hours}</span></p>
          <p className="row"><Phone size={18} /><a href={`tel:${config.phone.replace(/\s/g, "")}`}>{config.phone}</a></p>
          <a className="btn ghost map-btn" href={config.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} color="#e11d2e" /> Open in Maps</a>
        </div>
        <div>
          <h3>Explore</h3>
          <nav className="foot-nav"><Link to="/">Home</Link><Link to="/tailor-order">Tailor Order</Link><Link to="/customize">Customize Gallery</Link><Link to="/wishlist">Wishlist</Link></nav>
        </div>
        <div>
          <h3>Connect</h3>
          <div className="socials">
            <a href={waLink("Hello Ramya’s Boutique!")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle /></a>
            <a href={config.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
          </div>
        </div>
      </div>
      <p className="copy">© {new Date().getFullYear()} {config.name}. All rights reserved.</p>
    </footer>
  );
}
