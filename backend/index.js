import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import experienceRoutes from "./routes/experience.route.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => console.log(err));

app.get("/", (_req, res) => {
    res.send("Testing");
});

app.use("/api/experiences", experienceRoutes);

app.listen(5000, () => {
    console.log("Backend server is running on port 5000!");
});