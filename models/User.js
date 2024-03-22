const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["manager", "employee"],
            default: "employee",
            required: true,
        },
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task", //reference document in the "Task" collection
        },
    }
);

//Create and export model
const User = mongoose.model("User", userSchema);
module.exports = User;
