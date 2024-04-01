import { Router } from "express";

import { useUpload } from "@configs/multer.config";
import { awsImageController } from "@services/aws/images";

const uploadRouter = Router();

uploadRouter.post(
  "/",
  useUpload.single("image"),
  async (req, res) => await awsImageController.Upload(req, res),
);

export { uploadRouter };
