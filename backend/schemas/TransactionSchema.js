const mongoose = require("mongoose");


const TransactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        balance: {
            type: Number,
            required: true
        },
        is_credited: {
            type: Boolean,
            require: true
        },
        is_debited: {
            type: Boolean,
            require: true
        },
        amount: {
            type: Number,
            require: true
        },
        secondUserID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    }
)

module.exports = TransactionSchema;