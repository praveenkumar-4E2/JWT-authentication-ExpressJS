const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        enum: [`user`, `admin`],
        default:`user`
    }

})


//hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Check if the password has been modified
    this.password = await bcrypt.hash(this.password, 12); // Hash the password
    next();
});


//compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    console.log("compare reached")
    return await bcrypt.compare(candidatePassword, this.password); 
};

module.exports =  mongoose.model('User',userSchema)