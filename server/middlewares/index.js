import { expressjwt} from "express-jwt";
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import Image from "../models/image.js";
const JWT_SECRET = "JUMANDASJHDVKJSDBCKJBDCKJBKJDBC";

export const requireSignin = async (req, res, next) => {
  try {
    // console.log("reached requiresign in ")
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded);
    req.user = await User.findByPk(decoded.id); // Assuming user ID is stored in the token
    // console.log("-------------")
    // console.log(req.user)
    // console.log("-------------")
    // console.log("passed require sign in ")
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const isEnrolled = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const image = await Image.findOne({ where: { slug: req.params.slug } });

    if (!image) return res.status(404).json({ message: "Image not found" });

    const enrolledImages = await user.getImages();
    const isEnrolled = enrolledImages.some(enrolledImage => enrolledImage.id === image.id);

    if (!isEnrolled) return res.sendStatus(403);
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};