import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import  transactionRoute from "./routes/transaction.route";
import rateLimiter from "./middleware/rateLimiter";
import { initDB } from "./config/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);



app.get("/", (req, res) => {
  res.send("Expense Tracker! This is the backend server.");
});

app.use("/api",  transactionRoute );

initDB().then(() => {
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
});
