import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "../backend/routes/auth.routes.js";
import flashCardRoutes from "../backend/routes/flashCard.routes.js";



const app = express();
const PORT = process.env.PORT || 5000;



app.use(express.json())
app.use(
	cors({
	  origin: "http://localhost:5173", 
	  
	})
  );
app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.use('/api/flashcards',flashCardRoutes);




app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});

