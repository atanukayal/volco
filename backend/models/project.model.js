import mongoose from 'mongoose';

// Project Schema
const projectSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    description: { type: String },
    duedate: { type: Date },
    skills: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    tasks: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    Location: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    membersapplied: { type: Number, default: 0 },
    Activity: { type: String }
});

// Export the model
export default mongoose.model('Project', projectSchema);