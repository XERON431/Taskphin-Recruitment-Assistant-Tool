// controllers/auth.js
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }
    // Check if user already exists
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send("Email is already taken");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    await User.create({ name, email, password: hashedPassword });
    return res.json({ message: "Registration successful" });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send("Invalid email or password");
    }
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return res.cookie("token", token, { httpOnly: true }).json({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export const logout = async (req, res) => {
  try {
    return res.clearCookie("token").json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export const currentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).send("No token provided");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(400).send("User not found");
    }
    return res.json(user);
  } catch (err) {
    console.error("Current user error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export const sendTestEmail = async (req, res) => {
    const params = {
      Source: 'siddhantgoyal.iitg@gmail.com',  
      Destination: {
        ToAddresses: ['sidiitguwahati@gmail.com']
      },
      ReplyToAddresses: ['siddhantgoyal.iitg@gmail.com'],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
              <html>
                <h1>Reset password link</h1>
                <p>Please use the following link to reset your password</p>
              </html>
            `,
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Password reset link',
        },
      },
    };
  
    try {
      const emailSent = await SES.sendEmail(params).promise();
      console.log(emailSent);
      res.json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, error: 'Failed to send email' });
    }
  };

export const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send("Email is required");
    }
    // Generate password reset code
    const passwordResetCode = nanoid(6).toUpperCase();
    // Update user with password reset code
    await User.update({ passwordResetCode }, { where: { email } });
    // Send email with password reset code
    const params = {
      Source: 'siddhantgoyal.iitg@gmail.com',
      Destination: { ToAddresses: [email] },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<html><h1>Password Reset Code</h1><p>Your password reset code is: <strong>${passwordResetCode}</strong></p></html>`,
          },
        },
        Subject: { Charset: 'UTF-8', Data: 'Password Reset Code' },
      },
    };
    await SES.sendEmail(params).promise();
    return res.json({ message: "Password reset code sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export const resetpassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).send("All fields are required");
    }
    // Find user by email and password reset code
    const user = await User.findOne({ where: { email, passwordResetCode: code } });
    if (!user) {
      return res.status(400).send("Invalid email or code");
    }
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update user password and clear reset code
    await User.update({ password: hashedPassword, passwordResetCode: null }, { where: { email } });
    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).send("Internal Server Error");
  }
};
