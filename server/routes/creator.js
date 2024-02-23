import express from "express";
const router = express.Router();
//middleware
 import { requireSignin } from "../middlewares/index.js";

import {currentCreator, creatorImages, creatorImagesOpen} from '../controllers/creator.js';


router.get("/current-creator", requireSignin, currentCreator);

router.get("/creator-images", requireSignin, creatorImages);
router.get("/creator-images-open", requireSignin, creatorImagesOpen);
export default router;
