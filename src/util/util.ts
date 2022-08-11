import fs from "fs";
import { Response } from "express";
import Jimp = require("jimp");

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(file: string) {
  fs.unlinkSync(file);
}

export const validateImageUrl = (imageUrl: string, res: Response) => {
  if (!imageUrl)
    return res.status(400).send({
      status: "error",
      message: "Please use a valid image url!",
    });
};

export const handleServerError = (res: Response, error: any) => {
  if (error.response.status === 404)
    return res.status(404).send("Image not found!");
  if (error.response.status === 401)
    return res
      .status(401)
      .send("Unauthorized! Please check url and try again.");

  return res.status(500).send("Something went wrong. Please try again!");
};
