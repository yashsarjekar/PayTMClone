const AccountSchema = require("../schemas/AccountSchema");
const mongoose = require("mongoose");

const Account = mongoose.model('accounts', AccountSchema);
module.exports = Account;