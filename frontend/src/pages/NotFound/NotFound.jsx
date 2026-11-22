import { Link } from "react-router-dom";
import "./NotFound.css";
export default function NotFound({ msg = "This page doesn’t exist." }) {
  return (
    <div className="wrap nf"><h1>404</h1><p>{msg}</p><Link className="btn" to="/">Back to Home</Link></div>
  );
}
