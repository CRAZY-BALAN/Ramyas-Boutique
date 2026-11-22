import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "./db.js";

const app = express();
const prod = process.env.NODE_ENV === "production";
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

const enquiryLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
const loginLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
const clean = (s, n) => String(s ?? "").replace(/[<>]/g, "").trim().slice(0, n);

// Public: save a tailor enquiry (parameterised query -> no SQL injection)
app.post("/api/enquiries", enquiryLimit, async (req, res) => {
  const name = clean(req.body.name, 80), phone = clean(req.body.phone, 20), type = clean(req.body.type, 120), msg = clean(req.body.desc, 500);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(req.body.date || "") ? req.body.date : null;
  if (name.length < 2 || !/^[0-9+\s-]{8,15}$/.test(phone) || !type || msg.length < 5) return res.status(400).json({ error: "Invalid input" });
  try {
    await pool.execute("INSERT INTO enquiries (name,phone,dress_type,message,preferred_date) VALUES (?,?,?,?,?)", [name, phone, type, msg, date]);
    res.status(201).json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// Admin: login (httpOnly cookie), list enquiries
app.post("/api/admin/login", loginLimit, async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM admins WHERE email=?", [clean(req.body.email, 120)]);
    const ok = rows[0] && (await bcrypt.compare(String(req.body.password || ""), rows[0].password_hash));
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.cookie("token", token, { httpOnly: true, secure: prod, sameSite: prod ? "none" : "lax", maxAge: 2 * 3600 * 1000 });
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});
const auth = (req, res, next) => { try { jwt.verify(req.cookies.token, process.env.JWT_SECRET); next(); } catch { res.status(401).json({ error: "Unauthorised" }); } };
app.get("/api/admin/enquiries", auth, async (_q, res) => { const [rows] = await pool.query("SELECT * FROM enquiries ORDER BY id DESC LIMIT 200"); res.json(rows); });
app.post("/api/admin/logout", (_q, res) => { res.clearCookie("token"); res.json({ ok: true }); });

app.use((_q, res) => res.status(404).json({ error: "Not found" }));
app.use((err, _q, res, _n) => { console.error(err.message); res.status(500).json({ error: "Server error" }); });
app.listen(process.env.PORT || 5000, () => console.log("API running"));
