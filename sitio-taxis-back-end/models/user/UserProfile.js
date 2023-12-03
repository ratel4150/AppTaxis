import database from '../../config/index.js';
import bcrypt from 'bcrypt';
import User from '../index.js';
const {Schema} = database


const userProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: String,
  lastName: String,
  fullName: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  address: {
    street: String,
    city: String,
    zipCode: String,
  },
  phoneNumbers: [
    {
      type: String,
    },
  ],
  interests: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: Date,
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // Campo de estado más complejo
  status: {
    type: String,
    enum: [
    "PendingVerification",
    "Active",
    "Inactive",
    "Complete Profile",
    "Incomplete Profile",
    "Actively Seeking",
    "Currently Unavailable",
    "Pending Interview",
    "Pending Job Offer",
    "Current Employee",
    "New Registration",
    "Verified Profile",
    "Unverified Profile",
    "Complete Employment History",
    "Portfolio of Projects",
    "Favorites List",
    "Advanced Job Preferences",
    "Recommendations from Previous Employers",
    "Featured Candidate",
    "Multiple Interview Invitations",
    "Signed Contract",
    "Certifications and Training",
    "Languages",
    "Social Media and Online Presence",
    "Publications and Articles",
    "Premium Membership",
    "Application Tracking"
  ],
    default: 'PendingVerification',
  },
  // Otros campos relacionados con el perfil de usuario
});

const UserProfile = database.model('UserProfile', userProfileSchema);

export default UserProfile;
