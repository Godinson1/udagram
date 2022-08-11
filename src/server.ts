import express, { Response, Request } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import {
  filterImageFromURL,
  deleteLocalFiles,
  validateImageUrl,
  handleServerError,
} from "./util/util";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Task Solution
  app.get("/filteredimage", async (req: Request, res: Response) => {
    const { image_url } = req.query;
    validateImageUrl(image_url as string, res);
    try {
      const response = await axios.get(`${image_url}`, {
        responseType: "arraybuffer",
      });
      const imagePath = await filterImageFromURL(response.data);
      res.status(200).sendFile(imagePath, () => {
        deleteLocalFiles(imagePath);
      });
    } catch (error) {
      console.log("error", error);
      handleServerError(res, error);
    }
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
