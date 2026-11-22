import { useRef, useState } from "react";
// Hand-made zoom: wheel, pinch (2 pointers), double-click/tap, drag to pan.
export default function Zoomable({ src, alt }) {
  const [t, setT] = useState({ s: 1, x: 0, y: 0 });
  const ptrs = useRef(new Map());
  const last = useRef({ d: 0 });
  const clamp = (s) => Math.min(5, Math.max(1, s));
  const fix = (v) => (v.s <= 1 ? { s: 1, x: 0, y: 0 } : v);
  const down = (e) => { e.currentTarget.setPointerCapture(e.pointerId); ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY }); last.current.d = 0; };
  const move = (e) => {
    const p = ptrs.current; if (!p.has(e.pointerId)) return;
    const prev = p.get(e.pointerId); p.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (p.size === 2) {
      const [a, b] = [...p.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (last.current.d) setT((v) => fix({ ...v, s: clamp(v.s * (d / last.current.d)) }));
      last.current.d = d;
    } else if (p.size === 1) setT((v) => (v.s > 1 ? { ...v, x: v.x + e.clientX - prev.x, y: v.y + e.clientY - prev.y } : v));
  };
  const up = (e) => { ptrs.current.delete(e.pointerId); last.current.d = 0; };
  return (
    <div className="zm" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
      onWheel={(e) => setT((v) => fix({ ...v, s: clamp(v.s - e.deltaY * 0.002) }))}
      onDoubleClick={() => setT((v) => (v.s > 1 ? { s: 1, x: 0, y: 0 } : { s: 2.5, x: 0, y: 0 }))}>
      <img src={src} alt={alt} draggable={false} style={{ transform: `translate(${t.x}px,${t.y}px) scale(${t.s})` }} />
    </div>
  );
}
