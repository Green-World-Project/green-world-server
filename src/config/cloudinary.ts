import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

if (process.env.CLOUDINARY_URL) {
    const url = new URL(process.env.CLOUDINARY_URL);
    cloudinary.config({
        cloud_name: url.hostname,
        api_key: url.username,
        api_secret: url.password,
    });
} else {
    throw new Error('CLOUDINARY_URL environment variable is not defined');
}