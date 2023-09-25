import express from "express";
import youtubeController from "../1.controllers/youtube.controller.js";


const youtubeRouter = express.Router();

youtubeRouter.post("/transcription", youtubeController.transcription);

export default youtubeRouter;
