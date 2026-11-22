import { Link } from "react-router-dom";
import DressCard from "../../components/DressCard";
import { dresses } from "../../data/dresses";
import { useWishlist } from "../../hooks/useWishlist";
import "./Wishlist.css";
export default function Wishlist() {
  const { ids } = useWishlist();
  const list = dresses.filter((d) => ids.includes(d.id));
  return (
    <div className="wrap wl">
      <h1 className="h2">Your Wishlist</h1>
      {list.length ? <div className="grid">{list.map((d, i) => <DressCard key={d.id} d={d} i={i} />)}</div>
        : <p className="wl-empty">No saved dresses yet. Tap the heart on any dress to save it on this device.<br /><br /><Link className="btn" to="/">Browse collection</Link></p>}
    </div>
  );
}
