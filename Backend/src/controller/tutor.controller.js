import Tutor from "../model/tutor.model.js";

export const registerTutor = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      pincode,
      skills,
      pricing,
      experience,
      bio,
      days,
      timeSlots,
    } = req.body;

    const tutor = new Tutor({
      fullName,
      email,
      phone,
      location,
      pincode,
      skills,
      pricing,
      experience,
      bio,
      days,
      timeSlots,
    });

    await tutor.save();
    res.status(201).json({ message: "Tutor registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// NEW: get all tutors (with simple pagination)
export const getAllTutors = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const skip = (page - 1) * limit;

    const [tutors, total] = await Promise.all([
      Tutor.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Tutor.countDocuments(),
    ]);
    console.log("we are in the controller");
    if (!tutors.length) {
      return res.status(404).json({ message: "No tutors found" });
    }
    console.log("tutors", tutors);
    console.log("total", total);

    return res.status(200).json({
      success: true,
      data: tutors,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
