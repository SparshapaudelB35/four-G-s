const express = require("express");
const{
    getAllCustomer,
    saveAllCustomer,
}=require("../controller/userController");

const router = express.Router();

router.get('/users',getAllCustomer);
router.post("/users",saveAllCustomer)

module.exports = {router};