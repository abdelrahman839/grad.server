const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../models");

const register = async (req, res) => {
    try {
        const { email } = req.body;
        await User.findOne({ email }).then(async (user) => {
            if (!user) {
                const user = new User(req.body);
                await user.save().then((user) => {
                    // connect socket
                });
                let token = jwt.sign({ role: "user", userId: user._id, email: user.email, }, process.env.TOKEN_SECRET_KEY);
                res.status(200).json({
                    message: "Register successfully",
                    token
                });
            } else {
                return res.status(409).json({
                    message: "Email exists"
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                let token = jwt.sign({ role: "user", userId: user._id, email: user.email, }, process.env.TOKEN_SECRET_KEY);
                res.status(200).json({
                    message: "Sign-in successfully",
                    token
                });
            } else {
                res.status(403).json({
                    message: "Incorrect password"
                });
            }

        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

const getData = async (req, res) => {
    try {
        const { userId } = req.token;
        const user = await User.findOne({ _id: userId });
        if (user) {
            res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                gender: user.gender,
            });
        }else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}



module.exports = {
    register,
    signIn,
    getData,
}