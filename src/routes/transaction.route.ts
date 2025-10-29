import express from "express";
import { createTransaction, deleteTransactionById, getTransactions,  getTransactionsByUserId, getTransationSummaryBYUserId } from "../controllers/transactions.controller";

const router = express.Router();

router.get("/transactions", getTransactions);

router.post("/transactions", createTransaction);

router.get("/transactions/:userId", getTransactionsByUserId);

router.delete("/transactions/:id", deleteTransactionById);

router.get("/transactions/summary/:userId", getTransationSummaryBYUserId);

export default router;