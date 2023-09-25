import express from "express";
import serverController from "../1.controllers/server.controller.js";


const serverRouter = express.Router();

serverRouter.post("/", serverController.create);
//serverRouter.post("/gpt3_5", serverController.GPT3_5);


export default serverRouter;
