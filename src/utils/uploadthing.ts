import { generateReactHelpers } from "@uploadthing/react";
import type { fileRouter } from "~/server/uploadthing";

export const { useUploadThing } = generateReactHelpers<fileRouter>();
