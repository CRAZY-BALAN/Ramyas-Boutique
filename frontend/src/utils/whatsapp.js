import { config } from "../config";
export const waLink = (msg = "Hello Ramya’s Boutique!") => `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`;
export const openWA = (msg) => window.open(waLink(msg), "_blank", "noopener,noreferrer");
const base = () => window.location.origin;
export const dressMessage = (d, size) =>
  `Hello Ramya’s Boutique!\n\nI would like to order this dress:\n\nDress: ${d.name}\nDress ID: ${d.id}\nSize: ${size}\n${d.price ? `Price: ₹${d.price}\n` : ""}Link: ${base()}/dress/${d.id}\n\nPlease confirm availability and delivery details. Thank you!`;
export const designMessage = (d, request = "") =>
  `Hello Ramya’s Boutique!\n\nI am interested in this design:\n\nDesign: ${d.name}\nDesign ID: ${d.id}\nMaterials: ${d.materials}\nDescription: ${d.description}\n${request ? `My request: ${request}\n` : ""}Link: ${base()}/customize/${d.id}\n\nPlease share price and timeline. Thank you!`;
export const tailorMessage = (f) =>
  `Hello Ramya’s Boutique!\n\nI would like to place a tailor order:\n\nName: ${f.name}\nPhone: ${f.phone}\nDress type: ${f.type}\nDetails: ${f.desc}\n${f.date ? `Preferred date: ${f.date}\n` : ""}\nPlease let me know the next steps. Thank you!`;
