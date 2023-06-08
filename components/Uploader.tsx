"use client";

import { UploadButton, UploadDropzone } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center bg-black/5 p-4 rounded-xl my-4">
            <div className="flex flex-col items-center justify-center gap-4">
                {/* <span className="text-center font-bold">
                    {`Upload a file using a button:`}
                </span> */}
                {/* <UploadButton<OurFileRouter> endpoint={"imageUploader"} /> */}
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                {/* <span className="text-center font-bold">
                    {`...or using a dropzone:`}
                </span> */}
                <UploadDropzone<OurFileRouter> endpoint={"imageUploader"} />
            </div>
            
        </div>
    );
}
