import { Router } from "express";
import Experience from "../models/experience.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json({ data: experiences, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    res.status(200).json({ data: experience, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

router.post("/", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(200).json({ data: experience, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ data: experience, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: experience, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
