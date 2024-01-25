import { Router } from "express";
import multer from "multer";
import multerConfig from "@configs/multer.config";

import { AWSImageController } from "@services/aws/images/AWSImageController";

const uploadRouter = Router();
const useUpload = multer(multerConfig);

const awsImageController = new AWSImageController();

uploadRouter.post("/", useUpload.single("image"), awsImageController.Upload);

export { uploadRouter };
