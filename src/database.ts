import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/task_management");
        console.log("Database connected successfully.");
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;