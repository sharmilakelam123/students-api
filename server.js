const express = require("express");
require("dotenv").config();
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

 

const connectDB = require("./config/db");




const app = express();

app.use(express.json());

// DB connect
connectDB();

// routes
const userRoutes = require("./routes/studentsRoutes");
app.use("/api", userRoutes);

// test route
app.get("/", (req, res) => {
    res.send("API Working");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("server started on port", PORT);
});