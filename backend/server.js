import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import indexRoute from "./routes/index.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

app.use("/api", indexRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    process.exit(1);
  });
