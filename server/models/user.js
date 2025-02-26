import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  gender: { type: String, required: true },
  country: { type: String, required: true },
  dob: { type: Date, required: true },
  bio: { type: String, default: '' }, 
  profile_pics: { 
    type: [String], 
    required: true, 
    validate: {
      validator: function (value) {
        return value.length >= 2; 
      },
      message: 'At least two profile pictures are required.',
    },
  }, 
  looking_for: { type: String, required: true }, 
  interests: { type: [String], default: [] }, 
  personalityTraits: { type: [String], default: [] }, 
  // preferences: {
  //   ageRange: { type: [Number], default: [18, 35] }, 
  //   distance: { type: Number, default: 50 }
  // },
});

export default mongoose.model('User', userSchema);