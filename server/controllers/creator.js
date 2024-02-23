// controllers/creator.js
import User from "../models/user.js";
import Image from "../models/image.js";

export const currentCreator = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is stored in the req.user object
    
    // console.log("i reached currentcreator in controllers")
    // console.log(req.user)
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log("bro it got completed till here as well")
    return res.status(200).json({ user });
  } catch (err) {
    console.log("bhai sahab yha error hai ")
    console.error("Current creator error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export const creatorImages = async (req, res) => {
  try {
    console.log("woah")
    const userId = req.user.id; // Assuming the user ID is stored in the req.user object
    // return;
    console.log("helloji")
    const images = await Image.findAll({ where: { creatorId: userId }, order: [['createdAt', 'DESC']] });
    return res.json(images);
  } catch (err) {
    console.error("Creator images error:", err);
    return res.status(503).send("Internal Server Error");
  }
};

export const creatorImagesOpen = async (req, res) => {
  try {
    console.log("woah")
    // const userId = req.user.id; // Assuming the user ID is stored in the req.user object
    // return;
    console.log("helloji")
    const images = await Image.findAll({ where: { creatorId: 1 }, order: [['createdAt', 'DESC']] });
    return res.json(images);
  } catch (err) {
    console.error("Creator images error:", err);
    return res.status(503).send("Internal Server Error");
  }
};
