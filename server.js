import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("Mongo Error:", err);
});

app.get("/", (req, res) => {
    res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
