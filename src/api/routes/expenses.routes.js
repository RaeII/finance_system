import express from "express";
import channelController from "../1.controllers/expenses.controller.js";


const channelRouter = express.Router();

channelRouter.post("/", channelController.expensesAdd);
channelRouter.post("/userExpenses", channelController.getExpensesByUserId);

export default channelRouter;
