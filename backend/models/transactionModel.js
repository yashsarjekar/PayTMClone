const TransactionSchema = require("../schemas/TransactionSchema");
const mongoose = require("mongoose");

const Transaction = mongoose.model('transactions', TransactionSchema);
module.exports = Transaction;