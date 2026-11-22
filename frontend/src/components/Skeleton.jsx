import "./Skeleton.css";
export const Skeleton = ({ w = "100%", h = 16, r, style }) => <div className="skel" style={{ width: w, height: h, borderRadius: r, ...style }} />;
export const CardSkeleton = () => (
  <div className="sk-card"><div className="skel" style={{ aspectRatio: "3/4" }} /><Skeleton w="70%" h={14} style={{ margin: "10px 0 4px" }} /><Skeleton w="30%" h={12} /></div>
);
export const PageSkeleton = () => (
  <div className="wrap sk-page" aria-busy="true" aria-label="Loading">
    <Skeleton h={28} w="50%" style={{ margin: "0 auto 24px" }} />
    <div className="sk-grid">{Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}</div>
  </div>
);
