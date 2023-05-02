import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";
import formidable from "formidable";
import { env } from "~/env.mjs";
import { PassThrough, type Writable } from "stream";

const storage = new Storage();
const bucketName = env.GOOGLE_STORAGE_BUCKET_NAME;

export const config = {
  api: {
    bodyParser: false,
  },
};

const bucket = storage.bucket(bucketName);

export const createWriteStream = (filename: string, contentType?: string) => {
  const ref = bucket.file(filename);

  const stream = ref.createWriteStream({
    gzip: true,
    contentType: contentType,
  });

  return stream;
};

const uploadStream = (file: formidable.File): Writable => {
  const pass = new PassThrough();

  const stream = createWriteStream(
    file.originalFilename ?? file.newFilename,
    file.mimetype ?? undefined
  );
  pass.pipe(stream);

  return pass;
};

export const upload = (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable({ fileWriteStreamHandler: uploadStream });

  form.parse(req, () => {
    return res.status(200).json("File upload complete");
  });
};

export default upload;
