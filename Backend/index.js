const express = require("express");
const { connection } = require("./database/db");

const {Users} = require("./model/userSchema.js");



const app = express();

const PORT = 5000;



app.listen(PORT, () => {
    console.log(`Sercer is running on ${PORT}`);
});

connection()