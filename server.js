const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

// Import User model
const User = require("./module/User");

// Middleware
app.use(express.json());


// MongoDB Connection
mongoose.connect(
  "mongodb+srv://sharmilakelam1998_db_user:sharmila123@cluster0.abqptoa.mongodb.net/testdb?retryWrites=true&w=majority"
)
.then(() => {
    console.log("db connected");
})
.catch((err) => {
    console.log("DB ERROR:", err.message);
});


// CREATE
app.post("/cars/add", async (req, res) => {
    try {

        const user = new User(req.body);

        await user.save();

        res.send(user);

    } catch (err) {
        res.send(err);
    }
});


// READ
app.get("/cars/:id", async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        res.send(user);

    } catch (err) {
        console.log(err);
    }
});


// UPDATE
app.put("/cars/update/:id", async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.send(user);

    } catch (err) {
        console.log(err);
    }
});


// DELETE
app.delete("/cars/:id", async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);

        res.send("user deleted");

    } catch (err) {
        console.log(err);
    }
});


// Server
app.listen(4000, () => {
    console.log("server started");
});