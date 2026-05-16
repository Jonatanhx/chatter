import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => ({}))
    .onUploadComplete(({ file }) => {
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type fileRouter = typeof fileRouter;
