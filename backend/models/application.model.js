import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String },
  status: { type: String, default: "Pending" },
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Application", ApplicationSchema);
