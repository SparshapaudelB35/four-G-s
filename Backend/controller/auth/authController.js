import bcrypt from "bcrypt";
import { Users } from '../../model/index.js';
import { generateToken } from "../../security/jwt-util.js";

const saltRounds = 10;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("Searching for user with email:", email);

    
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      console.log("User not found in the database");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user.toJSON());

   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const token = generateToken({ user: user.toJSON() });

    
    return res.status(200).json({
      data: { access_token: token },
      message: "Successfully logged in",
    });
  } catch (error) {
    console.error("Error in login function:", error.message);
    res.status(500).json({ error: "Failed to login" });
  }
};

const create = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, email, password } = req.body;

   
    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    
    console.log("Checking if email exists...");
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({ message: "Email already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    
    const newUser = await Users.create({ name, email, password: hashedPassword });

    
    const token = generateToken({ user: newUser.toJSON() });

    
    return res.status(201).send({
      data: { access_token: token },
      message: "User successfully registered",
    });
  } catch (error) {
    console.error("Error in create function:", error.message); 
    res.status(500).json({ error: "Failed to register user" });
  }
};

const resetpassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    
    await user.update({ password: hashedPassword });

    res.status(200).json({ message: "Password successfully updated" });
  } catch (error) {
    console.error("Error in password reset:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
};

const init = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password;
    res
      .status(200)
      .send({ data: user, message: "Successfully fetched current user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const authController = {
  login,
  create,
  resetpassword,
  init,
};
