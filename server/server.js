import 'dotenv/config';
import express from 'express'
import { connectDB } from './config/db.js';
import authRoutes from "./routes/authRoutes.js"

// Create and configure an express application
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// this routes handle all authentication and authorization
app.use("/api/auth", authRoutes);

//test home route
app.get("/", (req, res) => res.json("Hellooo"))
app.get("/users", (req, res) => res.json("Users loading..."))


// CONNECT TO THE MONGODB DATABASE
await connectDB(process.env.MONGODB_URI);
//
app.listen(PORT, () => {
    console.log(`SERVER is running on http://localhost:${PORT}`)
})