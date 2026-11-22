import "dotenv/config";
import bcrypt from "bcryptjs";
import { pool } from "./db.js";
const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
await pool.execute("INSERT INTO admins (email,password_hash) VALUES (?,?) ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash)", [process.env.ADMIN_EMAIL, hash]);
console.log("Admin ready"); process.exit(0);
