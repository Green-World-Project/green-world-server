import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDB = process.env.MONGODB_URI;

if (!mongoDB) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}

let isConnected = false;

export const connectToDatabase = async () => {
    if (!isConnected) {
        console.log('Connecting to MongoDB...');
        try {
            await mongoose.connect(mongoDB);
            isConnected = true;
            console.log('Connected successfully to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }
};