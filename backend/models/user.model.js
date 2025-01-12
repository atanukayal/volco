// Import Mongoose
import mongoose from 'mongoose';

// Define the schema for the Users collection
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    default: ''
  },
  team_role: {
    type: String,
    default: ''
  },
  teams: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  education: {
    type: String,
    default: ''
  },
  skills: [{
    type: Array,
    default: [],
    ref: 'Skill'
   
  }],
  followers: [{
    type: Array,
    default: [],
    ref: 'User'
   
  }],
  connections: [{
    type: Array,
    default: [],
    ref: 'User'
  }],
  following: [{
    type: Array,
    default: [],
    ref: 'User'
  }],
  workexperience: [{
    ref: 'WorkExperience',
    type: Array,
    default: [],
  }],
  joinedon: {
    type: Number,
    default: Date.now
  },
  avator: [{
    type: Array,
    default: [],
    ref: 'Avatar'
  }],
  bio: [{
    type: Array,
    default: [],
    ref: 'Bio'
  }]
}, { timestamps: true });

// Create and export the model
const User = mongoose.model('User', userSchema);
export default User;
