const Users = require("../model/userSchema");
 
const getAllCustomer = async (req, res) => {
  console.log("Get All Customer");
  try {
    //fetching all the data from users table
    const users = await users.findAll();
 
    if (users.length === 0) {
      res
        .status(200)
        .send({ data: users, message: "successfully fetched data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error While fetching");
  }
};
 
const saveAllCustomer = async (req, res) => {
  console.log(req.body);
  const { name, userId ,email , password } = req.body;
  try {
    const user = await Users.findOne({ where: { userId: userId } });
 
    if (user == null) {
      await Users.create(req.body);
      return res.status(201).json({ message: "Users Added Sucessfully" });
    }
    return res.status(500).json({ message: "user is already Present" });
  } catch (error) {
    console.log(error);
  }
};
 
module.exports = { getAllCustomer, saveAllCustomer };