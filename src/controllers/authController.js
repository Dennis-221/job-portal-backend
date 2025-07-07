require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const db = require("../config/database");

const SECRET_KEY = process.env.SECRET_KEY;

// ✅ Helper to generate JWT
function generateToken(userId, userType) {
  return jwt.sign({ userId, userType }, SECRET_KEY, { expiresIn: "2h" });
}

// ✅ Register Jobseeker
exports.registerJobSeeker = async (req, res) => {
  try {
    const { name, email, password, mobile, workStatus, experience } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = await userModel.createUser(
      email,
      hashedPassword,
      "jobseeker"
    );

    const years = experience?.years || 0;
    const months = experience?.months || 0;

    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO job_seekers (id, name, mobile, workStatus, experienceYears, experienceMonths)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, name, mobile, workStatus, years, months],
        (err) => (err ? reject(err) : resolve())
      );
    });

    const token = generateToken(userId, "jobseeker");

    res.status(201).json({
      success: true,
      message: "Registration successful",
      userId,
      token,
    });
  } catch (err) {
    console.error("Register Jobseeker Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

// ✅ Register Employer
exports.registerEmployer = async (req, res) => {
  try {
    const {
      companyName,
      email,
      password,
      mobile,
      recruiterName,
      designation,
      companyWebsite,
    } = req.body;

    if (!email || !password || !companyName) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = await userModel.createUser(
      email,
      hashedPassword,
      "employer"
    );

    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO employers (id, companyName, mobile, recruiterName, designation, companyWebsite)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userId,
          companyName,
          mobile,
          recruiterName,
          designation,
          companyWebsite,
        ],
        (err) => (err ? reject(err) : resolve())
      );
    });

    const token = generateToken(userId, "employer");

    res.status(201).json({
      success: true,
      message: "Registration successful",
      userId,
      token,
    });
  } catch (err) {
    console.error("Register Employer Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

// ✅ Login for Both Roles
exports.login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const user = await userModel.getUserByEmailAndType(email, userType);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user.id, user.userType);

    res.json({
      success: true,
      message: "Login successful",
      userId: user.id,
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};
