# Ramya’s Boutique – Website

React (Vite) + plain CSS frontend. Orders and enquiries go through WhatsApp.
The backend (Node/Express/MySQL) is optional and only saves tailor-order enquiries.

## Run the website
```
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## 1. Replace the placeholders (important before launch)
- `frontend/src/config.js` → WhatsApp number (with country code), Instagram URL, address, Google Maps link, hours, years of experience, team, orders count.
- `frontend/src/data/dresses.js` and `designs.js` → real dresses/designs. Put photos in `frontend/public/images/` and use `"/images/name.jpg"`. 1–4 images per dress.
- `frontend/public/favicon.svg` → logo icon.
- Shop photos on the Tailor Order page: `shop` array in `pages/TailorOrder/TailorOrder.jsx`.

## 2. Optional backend (saves tailor enquiries)
```
cd backend
cp .env.example .env     # fill in values
mysql -u root -p < schema.sql
npm install && npm run seed && npm start
```
Then in `frontend/.env` set `VITE_API_URL=http://localhost:5000`.
Admin: `POST /api/admin/login`, `GET /api/admin/enquiries` (cookie auth).

## Features
Home with dress cards, search + category filter, fabric marquee · dress detail with 1–4 images, swipe, hover magnifier, fullscreen pinch/double-tap/drag zoom, size chips, size chart (cm/in), WhatsApp order with message preview, sticky order bar on mobile · Tailor Order (photo slider, delivery info, enquiry form, animated stats, team, steps) · Customize Gallery + design detail with request box · navbar (three-dot menu on mobile, Location scrolls to footer with red map pin) · skeleton loaders · page transitions · intro thread animation · wishlist, recently viewed, share, back-to-top, scroll progress, WhatsApp float button · reduced-motion support · PWA manifest.

## Security notes (honest version)
There is no way to "encrypt" a public frontend. Real protection here: HTTPS (Vercel/Netlify/Render give it free), helmet headers, rate limiting, input validation, parameterised SQL, bcrypt passwords, httpOnly JWT cookie, strict CORS, secrets only in `.env` (never commit it).

## Deploy (cheap)
Frontend → Vercel or Netlify (SPA rewrites already included). Backend + MySQL → Render/Railway. Set `FRONTEND_ORIGIN`, `NODE_ENV=production`, and `VITE_API_URL`.

## Not included
Admin dashboard UI (dresses are edited in `data/` files) and reference-photo upload on the tailor form. Easy to add later.
