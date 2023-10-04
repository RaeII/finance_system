import { Router } from "express";
import viewRoutes from "./view.routes.js";

const viewRouter = Router();

viewRouter.use("/", viewRoutes);

export default viewRouter;