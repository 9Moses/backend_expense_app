import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import  transactionRoute from "./routes/transaction.route";
import rateLimiter from "./middleware/rateLimiter";
import { initDB } from "./config/db";
import job from "./config/cronjob";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

if(process.env.NODE_ENV === "production") job.start();

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);



app.get("/", (req, res) => {
  res.send("Expense Tracker! This is the backend server.");
});


app.get("/api/health", (req, res) => {
  res.status(200).json({status: "ok"});
});

app.use("/api",  transactionRoute );

initDB().then(() => {
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
});
