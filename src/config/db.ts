import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

//Creates a SQL connection to the database using DB URL
export const sql = neon(process.env.DATABASE_URL ?? '');