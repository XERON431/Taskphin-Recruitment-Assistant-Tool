// controllers/image.js

import AWS from "aws-sdk";
import { nanoid } from "nanoid";
import slugify from "slugify";
import Image from '../models/image.js';
import User from "../models/user.js";
import { findAllPublishedImagesQuery, checkEnrollmentStatusQuery, enrollImageQuery, getUserImagesQuery } from '../controllers/queries.js';
import sequelize from '../models/database.js';
import { QueryTypes } from 'sequelize';

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
};

const s3 = new AWS.S3(awsConfig);

export const uploadImage = async (req, res) => {
    try {
        // console.log("reached upload image n controllers")
        const { image } = req.body;
        if (!image) return res.status(400).send("No image");

        const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
        const type = image.split(",")[0].split("/")[1];

        const params = {
            Bucket: "edemy-bucket-siddhant",
            Key: `${nanoid()}.${type}`,
            Body: base64Data,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `image/${type}`,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                return res.sendStatus(400);
            }
            console.log(data);
            return res.send(data);
        });
    } catch (err) {
        console.log(err);
        console.log("error occured in this block")
        return res.status(500).send("Internal Server Error");
    }
};

export const create = async (req, res) => {
    try {
        console.log("i reached create")
        const { name, email, phone, expectedSalary, description, currentStatus, nodejsExperience,reactjsExperience, category, score, image} = req.body;
        const slug = slugify(name.toLowerCase());
        // console.log("ok so here is the error")
        // console.log(req.body)
        // console.log(req.user)
        const imagei = await Image.create({
            name: req.body.name, email: req.body.email, phone: req.body.phone, expectedSalary: req.body.expectedSalary, description: req.body.description, currentStatus: req.body.currentStatus, nodejsExperience: req.body.nodejsExperience,reactjsExperience: req.body.reactjsExperience, category: req.body.category,  score:req.body.score,
            image: req.body.image, slug,
            creatorId: req.user.id,
        });
        console.log("yes this error is fixed")
        return res.json(imagei);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const createcandidate = async (req, res) => {
    try {
        console.log("i reached create")
        const { name, email, phone, expectedSalary, description, currentStatus, nodejsExperience,reactjsExperience, category, score, image} = req.body;
        const slug = slugify(name.toLowerCase());
        // console.log("ok so here is the error")
        // console.log(req.body)
        // console.log(req.user)
        const imagei = await Image.create({
            name: req.body.name, email: req.body.email, phone: req.body.phone, expectedSalary: req.body.expectedSalary, description: req.body.description, currentStatus: req.body.currentStatus, nodejsExperience: req.body.nodejsExperience,reactjsExperience: req.body.reactjsExperience, category: req.body.category,  score:req.body.score,
            image: req.body.image, slug,
            creatorId: 1,
        });
        console.log("yes this error is fixed")
        return res.json(imagei);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const read = async (req, res) => {
    try {
        const { slug } = req.params;
        const image = await Image.findOne({ where: { slug } });
        if (!image) return res.status(404).json({ message: "Image not found" });
        return res.json(image);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const update = async (req, res) => {
    try {
        const { slug } = req.params;
        const { name, email, phone, expectedSalary, description, currentStatus, nodejsExperience,reactjsExperience, category, score, image } = req.body;
        const updatedImage = await Image.update(
            { name, email, phone, expectedSalary, description, currentStatus, nodejsExperience,reactjsExperience, category, score, image },
            { where: { slug }, returning: true }
        );
        return res.json(updatedImage[1][0]);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const publish = async (req, res) => {
    try {
        const { imageId } = req.params;
        const image = await Image.findByPk(imageId);
        if (!image) return res.status(404).json({ message: "Image not found" });
        if (image.creatorId !== req.user.id && image.creatorId !==1) return res.status(403).json({ message: "Unauthorized" });

        const updatedImage = await Image.update({ published: true }, { where: { id: imageId }, returning: true });
        return res.json(updatedImage[1][0]);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const unpublish = async (req, res) => {
    try {
        const { imageId } = req.params;
        const image = await Image.findByPk(imageId);
        if (!image) return res.status(404).json({ message: "Image not found" });
        if (image.creatorId !== req.user.id  && image.creatorId !==1) return res.status(403).json({ message: "Unauthorized" });

        const updatedImage = await Image.update({ published: false }, { where: { id: imageId }, returning: true });
        return res.json(updatedImage[1][0]);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const images = async (req, res) => {
    try {
        const allImages = await findAllPublishedImagesQuery();
        return res.json(allImages);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const checkEnrollment = async (req, res) => {
    try {
        const { imageId } = req.params;
        const isEnrolled = await checkEnrollmentStatusQuery(req.user.id, imageId);
        return res.json({ status: isEnrolled });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const freeEnrollment = async (req, res) => {
    try {
        const { imageId } = req.params;

        // Find the image by ID
        const image = await Image.findByPk(imageId);

        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Update the enrolled field to true
        await image.update({ enrolled: true });

        // Add the enrolled image to the user's saved images
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the image already exists in saved images to avoid duplication
        const savedImagesIds = user.savedImages.map(savedImage => savedImage.id);
        if (!savedImagesIds.includes(image.id)) {
            // Add the image to saved images array
            await user.update({ savedImages: [...user.savedImages, image] });
        }

        return res.json({ message: "Candidate saved!" });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const userImages = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Retrieve the saved images array from the user's record
        const savedImages = user.savedImages;

        return res.json(savedImages);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const deleteImage = async (req, res) => {
    try {
        console.log("deletion controller reached")
        const { imageId } = req.params;

        // Find the image by ID
        const image = await Image.findByPk(imageId);

        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Delete the image from the database
        await image.destroy();

        // Optionally, handle other references or related records here

        return res.json({ message: "Image deleted successfully" });
    } catch (err) {
        console.log("woah so the error was here man" )
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};