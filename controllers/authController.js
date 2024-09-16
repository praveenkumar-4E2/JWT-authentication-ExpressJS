const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
const { jwtSecret, jwtExpiration } = require("../config/config");

//register user
exports.register = async (req,res) => {
    try {
        
        const { username, password, role } = req.body;
        const newUser = await User.create({ username, password, role });
        res.status(201).json({ message: `user created`, user: newUser });
    }
    catch (err) {
        res.status(400).json({ error: `registeration failed`,val:err })
    }
};


//Login useer
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        // Log if user is found
        if (!user) {
            
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Log the passwords for comparison
        console.log("Comparing passwords", { candidatePassword: password, hashedPassword: user.password });

        if (!(await user.comparePassword(password))) {
          
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: jwtExpiration });
        res.status(200).json({ token });
    } catch (err) {
        
        res.status(500).json({ error: "Login failed" });
    }
};