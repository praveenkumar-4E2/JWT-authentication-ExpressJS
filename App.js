const express = require("express")
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { dbUrl } = require('./config/config');

console.log(dbUrl)

const app = express();
app.use(express.json());

// Database connection
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to database'));

// Routes
app.use('/api/auth', authRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
