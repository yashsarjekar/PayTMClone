const express = require('express');
const mongoose = require("mongoose");
const cookie_parser = require('cookie-parser');
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
app = express();

app.use(express.json());
app.use(cookie_parser());



const port = 3000;
const hostname = '0.0.0.0';
mongoose.connect(
    "mongodb+srv://ysarjekar:6pnizps3ur8ChMir@cluster0.0pxk7oy.mongodb.net/paytm"
)
app.use(userRoutes);
app.use(accountRoutes);
app.listen(port, hostname, function listening() {
    console.log("Listening on port 3000")
});