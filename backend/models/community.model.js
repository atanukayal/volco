import mongoose from 'mongoose';


// Community Schema
const communitySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    members: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    admin: { type: String, required: true },
    updates: { type: Array, default: [] }
});

// Export the model
export default mongoose.model('Community', communitySchema);