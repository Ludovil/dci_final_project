import express from "express";
import { createContactMessage } from "../controllers/contactController.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ mess: "contact " });
});
router.post("/", createContactMessage);

export default router;
