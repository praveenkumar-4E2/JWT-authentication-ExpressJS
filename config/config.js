require("dotenv").config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'praveen',
    jwtExpiration: process.env.JWT_EXPIRATION || "1d",
    dbUrl : process.env.DB_URL
}