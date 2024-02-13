import { S3Storage } from "@utils/S3Storage";

export class UploadImageService {
  constructor(private s3Storage: S3Storage) {}
  async execute(file: Express.Multer.File): Promise<void> {
    await this.s3Storage.saveFile(file.filename);
  }
}
