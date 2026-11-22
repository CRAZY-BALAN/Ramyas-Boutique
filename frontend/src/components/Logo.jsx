import "./Logo.css";
export default function Logo({ size = "md" }) {
  return (
    <span className={`logo logo-${size}`} aria-label="Ramya’s Boutique">
      <span className="logo-main">
        <span className="logo-r">R</span>amya’s
        <svg className="logo-flourish" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 12 C40 -4 80 18 198 4" />
        </svg>
      </span>
      <span className="logo-sub">BOUTIQUE</span>
    </span>
  );
}
