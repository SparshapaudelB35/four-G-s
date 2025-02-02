const Users = require("../../model/User/userSchema.js");

const getAllCustomer = async (req, res) => {
  console.log("Get All Customer");
  try {
    // Fetching all the data from users table
    const users = await Users.findAll();

    if (users.length === 0) {
      res.status(200).send({ data: users, message: "successfully fetched data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error While fetching");
  }
};

// Create new user
const create = async (req, res) => {
  try {
    const body = req.body;
    console.log(req.body);

    // Validation
    if (!body?.email || !body?.name || !body?.password) {
      return res.status(500).send({ message: "Invalid payload" });
    }

    const users = await Users.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    res.status(201).send({ data: users, message: "Successfully created user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Update existing user
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log(req.params);

    // Checking if user exists or not
    const oldUser = await Users.findOne({ where: { userId: id } });

    if (!oldUser) {
      return res.status(500).send({ message: "User not found" });
    }

    oldUser.name = body.name;
    oldUser.password = body.password || oldUser.password;
    oldUser.email = body.email;
    await oldUser.save();

    res.status(201).send({ data: oldUser, message: "User updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete user
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const oldUser = await Users.findOne({ where: { userId: id } });

    // Checking if user exists or not
    if (!oldUser) {
      return res.status(500).send({ message: "User not found" });
    }

    await oldUser.destroy();
    res.status(201).send({ message: "User deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Fetch user by their ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ where: { userId: id } });

    if (!user) {
      return res.status(500).send({ message: "User not found" });
    }

    res.status(201).send({ message: "User fetched successfully", data: user });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const saveAllCustomer = async (req, res) => {
  console.log(req.body);
  const { name, userId, email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { userId: userId } });

    if (user == null) {
      await Users.create(req.body);
      return res.status(201).json({ message: "Users added successfully" });
    }
    return res.status(500).json({ message: "User is already present" });
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getAllCustomer,
  create,
  update,
  deleteById,
  getById,
  saveAllCustomer,
};


