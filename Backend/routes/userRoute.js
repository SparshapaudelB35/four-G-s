const express = require("express");
const{
    getAllCustomer,
}=require("../controller/userController");

const router = express.Router();

router.get('/users',getAllCustomer);

module.exports = {router};