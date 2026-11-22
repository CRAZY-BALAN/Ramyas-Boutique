import { useEffect, useState } from "react";
import { getWish, setWish } from "../utils/storage";
const subs = new Set();
export function useWishlist() {
  const [ids, set] = useState(getWish);
  useEffect(() => { const f = () => set(getWish()); subs.add(f); return () => subs.delete(f); }, []);
  const toggle = (id) => { const cur = getWish(); setWish(cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]); subs.forEach((f) => f()); };
  return { ids, has: (id) => ids.includes(id), toggle };
}
