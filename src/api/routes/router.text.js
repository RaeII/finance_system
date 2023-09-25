import express from "express";
import controllerText from "../1.controllers/controller.text.js";


const routerText = express.Router();

routerText.post("/davinci", controllerText.davinci);
routerText.post("/gpt3_5", controllerText.GPT3_5);


export default routerText;
