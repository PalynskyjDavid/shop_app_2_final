console.log("App.js starting");
const express = require("express");
const { connectDB, createUsers, createCarts } = require('./db/dbSetUp.js')
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cors = require('cors')
const sanitize = require('express-mongo-sanitize');
const api = require('./routers/api.js')



const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use(sanitize());

app.use('/', api)
app.get("/*", (req, res) => res.send('Unknown path!'));

app.listen(process.env.PORT, function (err) {
    if (err) console.log(err);
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

connectDB();
createUsers();
createCarts();