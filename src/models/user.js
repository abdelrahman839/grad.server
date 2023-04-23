const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        // personal info
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        phone: { type: String, trim: true, default: '', },
        email: { type: String, required: true, trim: true, unique: true, index: true, },
        gender: { type: String, trim: true, },
        password: { type: String, trim: true, required: true, },
        createdAt: { type: Date, default: Date.now },
    },
);

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(process.env.SALT_RAUNDS));
    next();
})

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;