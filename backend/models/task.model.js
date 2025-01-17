import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  venue: { type: String, required: true },
  duration: { type: String, required: true },
  teamSize: { type: Number, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", TaskSchema);
