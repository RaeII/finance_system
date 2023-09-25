import express from "express";
import googleController from "../1.controllers/google.controller.js";


const googleRouter = express.Router();

googleRouter.get("/oauth2callback", googleController.auth);

export default googleRouter;
