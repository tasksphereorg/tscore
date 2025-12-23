import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from "fs";
import dotenv from "dotenv"
import { fileURLToPath } from 'url';

dotenv.config()

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET
});


const uploadOnCloudnary = async (localFilePath) =>{
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath, {
                resource_type : "auto"
            }
        )
        console.log("File Uploaded on cloudnary. File src : " + response.url);
        fs.unlinkSync(localFilePath)        
        return response
    } catch (error) {
        console.log("Error on Cloudnary",error);
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudnary = async(publicId) =>{
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        console.log("Deleted from Cloudinary",publicId);
        
    } catch (error) {
        console.log("Error deleting from cloudinary",error);
        return null
    }
}

export { uploadOnCloudnary,deleteFromCloudnary}