import express from "express";
// import multer from 'multer';
import {
  uploadImagesInstruments,
  readLoggedUserInstruments,
  readVisitUserInstruments,
  deleteInstrument,
} from "../controllers/InstrumentsController.js";

const router = express.Router();

// Set up Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads"); // Specify the destination folder for the uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original filename for the uploaded files
//   },
// });

//const upload = multer({ storage });

// UPLOAD images
// router.post("/filesupload", upload.array("files"), uploadImagesInstruments);
router.post("/filesupload", uploadImagesInstruments);

// READ images logged-in USER - userProfile.jsx
router.post("/", readLoggedUserInstruments);

// READ images NOT logged-in USER - visitProfile.jsx
router.get("/:userId", readVisitUserInstruments);

// delete an instrument
router.delete("/:instrumentId", deleteInstrument);

export default router;
