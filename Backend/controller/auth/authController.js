import {Users} from '../../model/index.js';
import { generateToken } from "../../security/jwt-util.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    // Fetch user from the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Simple password comparison (for learning/demo only, not secure)
    if (user.password !== password) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken({ user: user.toJSON() });
    return res.status(200).send({
      data: { access_token: token },
      message: "Successfully logged in",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

const init = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password;
    res
      .status(201)
      .send({ data: user, message: "Successfully fetched current user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const authController = {
  login,
  init,
};
