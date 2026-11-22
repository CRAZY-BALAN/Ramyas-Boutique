// Generates a dress-shaped placeholder image. Replace with real photos (e.g. "/images/dress1.jpg").
const dress = "M60 20c0 18-10 26-14 36l-10 60c-4 30-26 70-30 140h176c-4-70-26-110-30-140l-10-60c-4-10-14-18-14-36z";
export function ph(label, c1 = "#0B6E6E", c2 = "#E6F4F1", v = 0) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c1}" stop-opacity=".35"/></linearGradient></defs><rect width="600" height="800" fill="url(#g)"/><circle cx="${150 + v * 100}" cy="140" r="50" fill="${c1}" opacity=".15"/><g transform="translate(131 104) scale(1.8)"><path d="${dress}" fill="${c1}" opacity=".85"/></g><text x="300" y="740" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="32" fill="${c1}">${label}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
