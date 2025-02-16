import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "../backend/routes/auth.routes.js";
import flashCardRoutes from "../backend/routes/flashCard.routes.js";
import path from "path";



const app = express();
const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

app.use(cors({
	origin: "http://localhost:5173",
	credentials: true,
  }));

app.use(express.json())

app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.use('/api/flashcards',flashCardRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_, res) => {
	res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
})




app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});

