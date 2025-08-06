import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    pincode: { type: String, required: true },
    skills: [{ type: String }],
    pricing: { type: Number, required: true },
    experience: { type: String },
    bio: { type: String, required: true },
    days: [{ type: String }],
    timeSlots: { type: String },
  },
  { timestamps: true }
);

const Tutor = mongoose.model("Tutor", tutorSchema);
export default Tutor;
