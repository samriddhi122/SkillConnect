import express from "express";
import { registerTutor } from "../controller/tutor.controller.js";
import { getAllTutors } from "../controller/tutor.controller.js";

const router = express.Router();

router.post("/register", registerTutor);
router.get("/", getAllTutors);
export default router;
