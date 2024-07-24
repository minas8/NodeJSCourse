// -- MODEL CLASS --
// 1. Import 'mongoose'
const mongoose = require('mongoose');

// 2. Define schema
const AccountSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true },
    balance: { type: Number, default: 0 }
});

// 3. Export model / schema
module.exports = mongoose.model('Account', AccountSchema);