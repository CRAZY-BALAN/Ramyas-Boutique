import { ph } from "../utils/img";
// ✏️ Custom design gallery. Replace with real photos + details.
const mk = (id, name, materials, c1, c2) => ({
  id, name, materials,
  description: `${name} – a custom design by Ramya’s Boutique. Tell us your colour, fabric and measurements and we will stitch it for you.`,
  images: [0, 1, 2].map((v) => ph(name, c1, c2, v)),
});
export const designs = [
  mk("c1", "Bridal Zari Lehenga", "Silk, zari thread, stone work", "#7d1f2e", "#f8e6e8"),
  mk("c2", "Embroidered Princess Blouse", "Raw silk, aari embroidery", "#0B6E6E", "#E6F4F1"),
  mk("c3", "Party Wear Gown", "Georgette, sequins, net", "#23408f", "#e8edfb"),
  mk("c4", "Festive Pattu Pavadai", "Pattu silk, zari border", "#b9892a", "#fbf3dc"),
  mk("c5", "Designer Kurti Set", "Cotton silk, mirror work", "#146c4a", "#e6f6ee"),
  mk("c6", "Back-Open Boat Neck Blouse", "Velvet, beads", "#a8566b", "#fbeaf0"),
];
