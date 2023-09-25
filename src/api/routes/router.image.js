import express from "express";
import controllerImage from "../1.controllers/controller.image.js";


const routerImage = express.Router();

routerImage.post("/createImage", controllerImage.createImage);


export default routerImage;
