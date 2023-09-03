const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const crypto = require('crypto');
const transporter = require('../config/nodemailer');

const router = express.Router();

// Route: Register a new user
router.post('/register', asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
        res.status(404)
        throw new Error('please add all field')
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400)
        throw new Error('user already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        isAdmin,
        password: hashedPassword
    })

    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(402)
        throw new Error('Invalid user data')
    }
}))

router.post('/login', asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).send({ error: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token
        })
    } catch (error) {
        res.status(500).send(error);
    }
}))

router.get('/me', async (req, res) => {
    res.status(200).json(req.user)
})

// Route: Request password reset
router.post('/reset-password', asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a random token for password reset
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send password reset email
        const resetLink = `http://your-app-domain/reset-password/${token}`;
        await transporter.sendMail({
            to: user.email,
            from: 'your-email@example.com',
            subject: 'Password Reset',
            html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
        });

        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
}));

// Route: Reset password with a valid token
router.post('/reset-password/reset', asyncHandler(async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }
        // Update user's password
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
}));

// Route: Get user profile (requires authentication)
router.get('/', asyncHandler(async (req, res) => {
    // Ensure that the user is authenticated
    if (!req.user) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    res.status(200).json(req.user);
}));

// Generate JWT token with user ID
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = router;
