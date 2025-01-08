
// Import Mongoose
import mongoose from 'mongoose';

// Organisation Schema
const organisationSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    host: { type: String, required: true },
    members: { type: Array, default: [] }
});

// Export the model
export default mongoose.model('Organisation', organisationSchema);