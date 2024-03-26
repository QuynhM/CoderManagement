const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [
            "pending",
            "working",
            "review",
            "done",
            "archive"
        ],
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }   
},
{ timestamps: { createdAt: true, updatedAt: true } });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
