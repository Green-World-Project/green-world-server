import mongoose from "mongoose";

// type Gender = {
//     Male: 'male',
//     Female: 'female'
// }

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    age: { type: Number, default: null },
    gender: { type: String, default: null },
    password: { type: String, required: true }
});

export default mongoose.model('User', userSchema, "users");