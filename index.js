const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config')

const app = express();
require('dotenv').config()
const router = require("./routes");

const port = process.env.PORT || 4000

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
    console.log('server running on port:', port);
});