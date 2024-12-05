import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    isStudent: {
      type: Boolean,
      default: false,
    },
    canvasApiKey: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Profile = mongoose.model("Profile", profileSchema);
