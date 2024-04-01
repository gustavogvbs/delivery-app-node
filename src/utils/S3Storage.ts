import { S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";
import mime from "mime-types";
import path from "path";

import { env } from "@src/env";

import { multerConfig } from "@configs/multer.config";
import { AppError } from "@errors/AppErro";

export class S3Storage {
  private client: S3;

  constructor() {
    this.client = new S3({
      credentials: {
        accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
      },
      region: env.AWS_S3_REGION,
    });
  }

  async saveFile(fileName: string): Promise<string> {
    const originalPath = path.resolve(multerConfig.directory, fileName);

    const ContentType = mime.contentType(originalPath);

    if (ContentType !== "image/jpeg" && ContentType !== "image/png") {
      throw new AppError("The contenty-type not permition", 400);
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const parallelUploads3 = new Upload({
      client: this.client,
      params: {
        Bucket: env.AWS_S3_BUCKET,
        Key: fileName,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      },
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    const { $metadata, Location } = await parallelUploads3.done();

    if ($metadata.httpStatusCode !== 200 || !Location) throw new Error();

    await fs.promises.unlink(originalPath);

    return Location;
  }
}
