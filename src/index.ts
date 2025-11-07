import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db";
import  transactionRoute from "./routes/transaction.route";
import rateLimiter from "./middleware/rateLimiter";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.send("Expense Tracker! This is the backend server.");
});

app.use("/api",  transactionRoute );

initDB().then(() => {
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
});
