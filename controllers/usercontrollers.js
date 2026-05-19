const User = require("../modules/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.send("user already exists");
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hash
        });

        await user.save();

        res.send("user registered");

    } catch (err) {
        res.send(err.message);
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.send("user not found");

        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.send("invalid password");

        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "1d" }
        );

        res.send({ message: "login success", token });

    } catch (err) {
        res.send(err.message);
    }
};