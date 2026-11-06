import User from "../models/users.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    let error = 0;
    const checkUser = await User.findOne({ email }).exec();

    if (!checkUser) {
      error = 1;
      return res.status(400).json({ error: "Invalid username" });
    }

    if ((await bcrypt.compare(password, checkUser.password)) === false) {
      error = 1;
      return res.status(400).json({ error: "Invalid Password" });
    }

    if (error === 0) {
      //Create a token using JWT
      const token = generateToken(checkUser);
      console.log(token);

      res
        .cookie("auth_token", token, {
          httpOnly: true,
          secure: "true",
          sameSite: "none",
          maxAge: 3600000,
        })
        .status(200)
        .json({
          message: "Login Successful",
          user: checkUser,
        });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export async function registerUser(req, res) {
  try {
    const raw = req.body;
    const hashedPass = await bcrypt.hash(raw.password, 10);
    const data = new User({ ...raw, password: hashedPass });
    console.log(data);
    await User.create(data);

    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
