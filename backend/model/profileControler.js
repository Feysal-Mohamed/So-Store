import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String, // file path or URL
      default: "/uploads/default-avatar.png",
    },
    coverImage: {
      type: String, // file path or URL
      default: "/uploads/default-cover.jpg",
    },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", userSchema);
export default UserProfile;
