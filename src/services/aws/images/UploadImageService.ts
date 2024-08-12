import { S3Storage } from "@utils/S3Storage";

import { type ImageJsonSchemaType } from "@type/image-json";

export class UploadImageService {
  constructor(private s3Storage: S3Storage) {}
  async execute(
    file: Express.Multer.File,
    name: string,
  ): Promise<ImageJsonSchemaType> {
    const url = await this.s3Storage.saveFile(file.filename);

    return { url, alt: `Imagem do produto ${name}` };
  }
}
