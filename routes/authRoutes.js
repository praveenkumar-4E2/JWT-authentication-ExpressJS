const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//public routes
router.post('/register', authController.register);
router.post('/login',authController.login)

router.get("/hi", (req, res) => {
    res.json({message:"welcome"})
})


// Protected routes
router.get('/protected', authMiddleware.protect, (req, res) => {
    res.status(200).json({ message: 'You have access!' });
});

// Admin-only route
router.get('/admin', authMiddleware.protect, authMiddleware.restrictTo('admin'), (req, res) => {
    res.status(200).json({ message: 'Admin access granted' });
});

module.exports = router;