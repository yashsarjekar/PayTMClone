const zod = require("zod");

const accountvalidation = zod.object({
    amount: zod.number()
});

module.exports = accountvalidation;