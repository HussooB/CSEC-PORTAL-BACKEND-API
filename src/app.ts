import dotenv from "dotenv";
import express from "express";
import connectToDB from "./config/db";
import logger from "./middleware/logger";
import userRoute from "./routes/user.route";

dotenv.config();
connectToDB();

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/users", userRoute);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;
