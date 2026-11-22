import { ph } from "../utils/img";
// ✏️ Add/remove dresses here. For real photos use paths like "/images/d1-1.jpg" (files go in public/images).
const chart = [
  { size: "S", bust: 84, waist: 68, hip: 90, shoulder: 36, length: 105 },
  { size: "M", bust: 88, waist: 72, hip: 94, shoulder: 37, length: 106 },
  { size: "L", bust: 92, waist: 76, hip: 98, shoulder: 38, length: 107 },
  { size: "XL", bust: 98, waist: 82, hip: 104, shoulder: 39, length: 108 },
  { size: "XXL", bust: 104, waist: 88, hip: 110, shoulder: 40, length: 109 },
];
const S = (...out) => ["S", "M", "L", "XL", "XXL"].map((size) => ({ size, available: !out.includes(size) }));
const mk = (id, name, category, price, fabric, c1, c2, sizes, isNew = false) => ({
  id, name, category, price, fabric, isNew, sizes, sizeChart: chart,
  care: "Dry clean recommended. Do not bleach. Iron on low heat.",
  description: `${name} – stitched with care at Ramya’s Boutique. Sample text: replace with the real details of this dress.`,
  images: [0, 1, 2, 3].map((v) => ph(name, c1, c2, v)),
});
export const dresses = [
  mk("d1", "Peacock Silk Lehenga", "Lehenga", 7500, "Pure silk", "#0B6E6E", "#E6F4F1", S("XXL"), true),
  mk("d2", "Rose Gold Blouse", "Saree Blouse", 1800, "Brocade", "#a8566b", "#fbeaf0", S()),
  mk("d3", "Emerald Churidar Set", "Churidar", 3200, "Cotton silk", "#146c4a", "#e6f6ee", S("S"), true),
  mk("d4", "Royal Blue Anarkali", "Churidar", 4500, "Georgette", "#23408f", "#e8edfb", S("XL", "XXL")),
  mk("d5", "Little Princess Frock", "Kids", 1500, "Net & satin", "#b0508f", "#fbe9f5", S("L", "XL", "XXL")),
  mk("d6", "Mustard Kurti", "Kurti", 1400, "Cotton", "#b9892a", "#fbf3dc", S(), true),
  mk("d7", "Maroon Bridal Lehenga", "Lehenga", 14500, "Velvet & zari", "#7d1f2e", "#f8e6e8", S("S", "XXL")),
  mk("d8", "Designer Boat-Neck Blouse", "Saree Blouse", 2100, "Raw silk", "#0B6E6E", "#E6F4F1", S()),
];
