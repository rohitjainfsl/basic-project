import express from "express";
import cors from "cors";
import recordRouter from "./routes/records.js";
import authRouter from "./routes/auth.js";
import connectToDB from "./config/db.js";
import "dotenv/config";

const corsOptions = {
  origin: function (origin, callback) {
    // Example: Allow all requests if no origin is present (e.g., mobile apps)
    if (!origin) return callback(null, true);

    // Example: Check against a whitelist or database
    const whitelist = ["http://localhost:5173"];
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.PORT;

await connectToDB();

//API

app.use("/api/records", recordRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log("Server has started on port " + PORT));
