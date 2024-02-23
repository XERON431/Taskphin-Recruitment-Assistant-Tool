import express from "express";
const router = express.Router();
//middleware
 import { requireSignin, isEnrolled } from "../middlewares/index.js";

import {uploadImage, create, read, update,publish ,
    unpublish, images, checkEnrollment, freeEnrollment, userImages, createcandidate, deleteImage} from '../controllers/image.js';
    
router.get('/images',images);
//image
router.post("/image/upload-image",uploadImage );


//image
router.post("/image", requireSignin,create);
router.post("/imagecandidate",createcandidate);
router.put("/image/:slug", requireSignin, update);
router.get("/image/:slug", read);
router.put("/image/publish/:imageId", requireSignin,publish);
router.put("/image/unpublish/:imageId", requireSignin,unpublish);
router.delete('/image/:imageId', deleteImage);

router.get('/check-enrollment/:imageId',requireSignin,checkEnrollment);
router.post('/free-enrollment/:imageId',requireSignin,freeEnrollment);


router.get('/user-images', requireSignin,userImages);

router.get("/user/image/:slug",requireSignin,isEnrolled,read);
export default router;
 