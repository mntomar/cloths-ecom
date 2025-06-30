const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "Please provide userName, email, and password",
                success: false
            });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name: userName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });

    } catch (err) {
        console.error('❌ Registration Error:', err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login Success",
            success: true,
            token: jwtToken,           
            email,
            userName: user.name
        });

    } catch (err) {
        console.error('❌ Login Error:', err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = { registerUser, loginUser };
