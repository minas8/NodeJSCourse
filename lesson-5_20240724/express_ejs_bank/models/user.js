// -- MODEL CLASS --
// 1. Import 'mongoose'
const mongoose = require('mongoose');

// 2. Define schema
const AccountSchema = new mongoose.Schema({
    number: { type: String, required: true },
    balance: { type: Number, default: 0 }
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    accounts: [AccountSchema]
});

// 3. Export model / schema
module.exports = mongoose.model('User', UserSchema);