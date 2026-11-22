import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function BackButton({ label = "Back" }) {
  const nav = useNavigate();
  return <button className="btn ghost" style={{ padding: "8px 18px", fontSize: ".88rem", boxShadow: "none" }} onClick={() => (window.history.length > 1 ? nav(-1) : nav("/"))}><ArrowLeft size={16} /> {label}</button>;
}
