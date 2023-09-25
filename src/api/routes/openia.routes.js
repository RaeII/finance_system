import express from "express";
import controllerOpeia from "../1.controllers/controller.openIa.js";


const routerOpenIa = express.Router();

routerOpenIa.get("/models", controllerOpeia.models);

export default routerOpenIa;
