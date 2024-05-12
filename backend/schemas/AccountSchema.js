const mongoose = require("mongoose");


const AccountSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        balance: {
            type: Number,
            required: true
        }
    }
)

module.exports = AccountSchema;