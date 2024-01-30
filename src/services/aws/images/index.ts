import { S3Storage } from "@utils/S3Storage";

import { AWSImageController } from "./AWSImageController";
import { UploadImageService } from "./UploadImageService";

const s3Storage = new S3Storage();
const uploadImageService = new UploadImageService(s3Storage);

const awsImageController = new AWSImageController(uploadImageService);

export { awsImageController, uploadImageService };
