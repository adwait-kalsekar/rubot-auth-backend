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
      required: true,
    },
    canvasApiKey: {
      type: String,
      default: null,
    },
    credits: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  },
);

export const Profile = mongoose.model("Profile", profileSchema);
