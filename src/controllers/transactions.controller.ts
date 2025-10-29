import { Request, Response } from "express";
import { sql } from "../config/db";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { user_id, title, amount, category } = req.body;

    if (!user_id || !title || amount === undefined || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const transaction =
      await sql`INSERT INTO transactions (user_id, title, amount, category)
         VALUES (${user_id}, ${title}, ${amount}, ${category})
         RETURNING *`;
    res.status(201).json({
      paylaod: {
        data: transaction[0],
      },
      message: "Transaction created successfully",
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Error creating transaction" });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await sql`SELECT * FROM transactions`;
    res.json({
      payload: {
        data: transactions,
      },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error: Failed to fetch transactions" });
  }
};

export const getTransactionsByUserId = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const transaction = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
      if (transaction.length === 0) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.json({
        payload: {
          data: transaction,
        },
      });
    }
    catch (error) {
      console.error("Error fetching User transactions:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error: Failed to fetch User transactions" });
    }
  };


  export const deleteTransactionById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if(isNaN(parseInt(id))) {
          return res.status(400).json({ message: "Invalid transaction ID" });
      }
      
      const transaction = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
      if (transaction.length === 0) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.json({
        payload: {
          data: transaction[0],
          message: "Transaction deleted successfully",
        },
      });
    }
    catch (error) {
      console.error("Error deleting transactions:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error: Failed to delete transactions" });
    }
  }
