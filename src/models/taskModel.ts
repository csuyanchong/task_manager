import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true},
    description: {type: String},
    deadline: {type: Date, required: true},
    status: {type: String, enum: ["pending", "running", "done"], default: "pending"},
    priority: {type: String, enum: ["low", "medium", "high"]}
});

const Task = mongoose.model("Task", taskSchema);

export default Task;