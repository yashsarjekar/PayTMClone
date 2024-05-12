const express = require('express');


app = express();

app.use(express.json());




const port = 3000;
const hostname = '0.0.0.0';

app.listen(port, hostname, function listening() {
    console.log("Listening on port 3000")
});