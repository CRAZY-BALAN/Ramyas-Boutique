const read = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
export const getRecent = () => read("rb_recent");
export const pushRecent = (id) => write("rb_recent", [id, ...read("rb_recent").filter((x) => x !== id)].slice(0, 8));
export const getWish = () => read("rb_wish");
export const setWish = (v) => write("rb_wish", v);
