import cloudinary from "cloudinary";
import UserCollection from "../models/usersSchema.js";
import instrumentsCollection from "../models/instrumentsSchema.js";
import fs from "fs";
import { createReadStream } from "streamifier";

// upload several images as files
export const uploadImagesInstruments = async (req, resp) => {
  try {
    const { userId, description } = req.body;
    const files = req.files;

    const uploadedImages = [];

    // In case the user updates just one single img with one description, avoid that the code
    // saves only the first index of the description (first letter)
    let descriptions = description; // Create a new variable to hold the modified description array
    if (!Array.isArray(descriptions)) {
      // If a single description is provided, convert it to an array
      descriptions = [descriptions];
    }

    console.log(files);
    // Upload images to Cloudinary
    if (Array.isArray(files.files)) {
      for (let i = 0; i < files.files.length; i++) {
        // const cloudinaryResponse = cloudinary.v2.uploader.upload_stream({
        //   folder: "final_project/instruments",
        // });
        cloudinary.v2.uploader
          .upload_stream(
            { folder: "final_project/instruments" },
            async (err, res) => {
              if (err) {
                console.log(err);
              } else {
                console.log(res);

                const instruments = new instrumentsCollection({
                  userId: userId,
                  imageUrl: res.secure_url,
                  // see lines 14 to 20 :
                  description: descriptions[i] || "",
                });
                await instruments.save();
                uploadedImages.push(instruments);
                const user = await UserCollection.findByIdAndUpdate(
                  userId,
                  {
                    $push: {
                      instruments: {
                        $each: uploadedImages.map((img) => img._id),
                      },
                    },
                  },
                  { new: true }
                );
                return resp.json(user);
              }
            }
          )
          .end(files.files[i].data);
      }
    } else if (files.files) {
      cloudinary.v2.uploader
        .upload_stream(
          { folder: "final_project/instruments" },
          async (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(description);

              const instruments = new instrumentsCollection({
                userId: userId,
                imageUrl: res.secure_url,
                // see lines 14 to 20 :
                description: description || " ",
              });
              await instruments.save();
              uploadedImages.push(instruments);
              const user = await UserCollection.findByIdAndUpdate(
                userId,
                {
                  $push: {
                    instruments: {
                      $each: uploadedImages.map((img) => img._id),
                    },
                  },
                },
                { new: true }
              );
              return resp.json(user);
            }
          }
        )
        .end(files.files.data);
    }
    console.log(uploadedImages);
    // Update user's instruments field
    // const user = await UserCollection.findByIdAndUpdate(
    //   userId,
    //   {
    //     $push: {
    //       instruments: {
    //         $each: uploadedImages.map((img) => img._id),
    //       },
    //     },
    //   },
    //   { new: true }
    // );

    // Empty the /uploads folder
    // const folderPath = "./uploads";
    // fs.readdir(folderPath, (err, files) => {
    //   if (err) {
    //     console.error("Error reading folder:", err);
    //     return;
    //   }

    //   files.forEach((file) => {
    //     const filePath = `${folderPath}/${file}`;

    //     fs.unlink(filePath, (err) => {
    //       if (err) {
    //         console.error("Error deleting file:", err);
    //         return;
    //       }
    //       console.log("File deleted:", filePath);
    //     });
    //   });
    // });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: "Server Error" });
  }
};

export const readLoggedUserInstruments = async (req, res) => {
  try {
    const { instrumentsIds } = req.body;

    // Retrieve the Cloudinary image documents based on the provided IDs
    const instruments = await instrumentsCollection.find({
      _id: { $in: instrumentsIds },
    });

    res.status(200).json({ instruments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const readVisitUserInstruments = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by userId
    const user = await UserCollection.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the user's cloudinaryImages
    const instruments = await instrumentsCollection.find({ userId });

    res.json(instruments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// delete an instrument
export const deleteInstrument = async (req, res) => {
  try {
    const { instrumentId } = req.params;

    // Find the instrument by its ID
    const instrument = await instrumentsCollection.findById(instrumentId);

    if (!instrument) {
      return res.status(404).json({ error: "Instrument not found" });
    }

    // Delete the instrument from the instruments collection
    await instrumentsCollection.findByIdAndRemove(instrumentId);

    // Remove the instrument ID from the user's instruments field
    const user = await UserCollection.findByIdAndUpdate(
      instrument.userId,
      {
        $pull: { instruments: instrumentId },
      },
      { new: true }
    );

    // Delete image from Cloudinary
    const publicId = instrument.imageUrl.split("/").pop().split(".")[0];
    console.log("publicId:", publicId);
    await cloudinary.v2.uploader.destroy(
      `final_project/instruments/${publicId}`
    );

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
