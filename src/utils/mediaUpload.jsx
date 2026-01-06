import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://oysjhyphrtfxwcinmdta.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95c2poeXBocnRmeHdjaW5tZHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNjYzMjgsImV4cCI6MjA2MDc0MjMyOH0.Sz16Jzo5gY0NrTfD2Hv4k2rC1X62Xd9SjbsyzaxOBd8",
);

export default function mediaUpload(file) {
    const promise = new Promise((resolve, reject) => {
        if (file == null) {
            reject("No file selected");
        }
        const timeStamp = new Date().getTime();
        const newFileName = timeStamp + file.name;

        supabase.storage
            .from("images")
            .upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false,
            })
            .then(() => {
                const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl;
                resolve(url);
            })
            .catch((error) => {
                console.log(error);
                reject("File upload failed");
            });
    });
    return promise;
}
