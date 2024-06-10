const express = require('express');
const mongoose = require("mongoose");
const cookie_parser = require('cookie-parser');
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const dbConfig = require("./configs/dbConfig");
const cors = require("cors");
app = express();
app.use(cors());
app.use(express.json());
app.use(cookie_parser());



const port = 3000;
const hostname = '0.0.0.0';
mongoose.connect(
    `mongodb+srv://${dbConfig.mongodb.username}:${dbConfig.mongodb.password}@${dbConfig.mongodb
    .hostname}/${dbConfig.mongodb.database_name}`
)
app.use(userRoutes);
app.use(accountRoutes);
app.listen(port, hostname, function listening() {
    console.log("Listening on port 3000:")
});