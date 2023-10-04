import express from "express";
import ViewController from "../1.controllers/View.controller.js";

const viewRouter = express.Router();

viewRouter.get("/", ViewController.home);
viewRouter.get("/stages/:stage_id", ViewController.stages);

export default viewRouter;   
