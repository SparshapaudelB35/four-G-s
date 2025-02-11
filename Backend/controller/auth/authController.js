import bcrypt from "bcrypt";
import { Users } from '../../model/index.js';
import { generateToken } from "../../security/jwt-util.js";

const saltRounds = 10;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("Searching for user with email:", email);

    // Fetch user from the database
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      console.log("User not found in the database");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user.toJSON());

    // Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token for the user
    const token = generateToken({ user: user.toJSON() });

    // Return success response with token
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
    console.log("Request body:", req.body); // Log the request body

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if the email already exists
    console.log("Checking if email exists...");
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({ message: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user in the database
    const newUser = await Users.create({ name, email, password: hashedPassword });

    // Generate a token for the newly created user
    const token = generateToken({ user: newUser.toJSON() });

    // Return success response
    return res.status(201).send({
      data: { access_token: token },
      message: "User successfully registered",
    });
  } catch (error) {
    console.error("Error in create function:", error.message); 
    res.status(500).json({ error: "Failed to register user" });
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
  init,
};
