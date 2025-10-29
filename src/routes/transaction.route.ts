import express from "express";
import { createTransaction, getTransactions } from "../controllers/transactions.controller";

const router = express.Router();

router.get("/transactions", getTransactions);

router.post("/transactions", createTransaction);

export default router;