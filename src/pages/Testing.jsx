import { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../utils/mediaUpload";

const Testing = () => {
    const [file, setFile] = useState(null)
    
    const handleUpload = () => {
        mediaUpload(file).then(
            (url)=>{
                console.log(url);
                toast.success("File uploaded successfully")
            }
        ).catch(
            (error)=>{
                console.log(error);
                toast.error("File upload failed")
            }
        )
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <input type="file" onChange={(event)=>{
                setFile(event.target.files[0]);
            }}/>
            <button onClick={handleUpload} className="bg-gray-500 text-white">Upload</button>
        </div>
    );
};

export default Testing;