import {Request, Response, NextFunction} from "express";
import ratelimit from "../config/upstash";


const rateLimiter = async (req: Request, res:Response, next: NextFunction) => {
 try {
  const { success } = await ratelimit.limit(req.ip ?? '');
  if (!success) {
    return res.status(429).json({ message: "Too many requests, please try again later" });
  }
  next();
 } catch (error) {
  console.error("Error checking rate limit:", error);
  res.status(500).json({ error: "Internal Server Error: Failed to check rate limit" });
 }
}

export default rateLimiter
