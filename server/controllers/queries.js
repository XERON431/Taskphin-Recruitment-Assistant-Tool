// controllers/queries.js

import sequelize from '../models/database.js';
import { QueryTypes } from 'sequelize';

// Find all published images
export const findAllPublishedImagesQuery = async () => {
    try {
        const query = `
            SELECT * FROM "Image"
            WHERE published = true;
        `;
        const images = await sequelize.query(query, { type: QueryTypes.SELECT });
        return images;
    } catch (err) {
        throw new Error(err);
    }
};

// Check enrollment status for a specific user and image
export const checkEnrollmentStatusQuery = async (userId, imageId) => {
    try {
        // Since there is no user_images table, returning false by default
        return false;
    } catch (err) {
        throw new Error(err);
    }
};

// Enroll a user in a specific image
export const enrollImageQuery = async (userId, imageId) => {
    try {
        // Since there is no user_images table, do nothing
    } catch (err) {
        throw new Error(err);
    }
};

// Get images for a specific user
export const getUserImagesQuery = async (userId) => {
    try {
        // Since there is no user_images table, return an empty array
        return [];
    } catch (err) {
        throw new Error(err);
    }
};
