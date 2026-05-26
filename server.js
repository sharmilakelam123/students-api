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

import User from "./models/userModel.js";

app.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
