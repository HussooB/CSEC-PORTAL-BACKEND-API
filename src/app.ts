import dotenv from "dotenv";
import express from "express";
import connectToDB from "./config/db";
import logger from "./middleware/logger";

dotenv.config();
connectToDB();

const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;
