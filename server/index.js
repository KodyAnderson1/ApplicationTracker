import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import adminRoutes from "./routes/admin.js";

// import { ApplicationsData } from "./data/index.js";

// Schema imports
import User from "./models/User.js";
import Application from "./models/Application.js";
import Job from "./models/Job.js";

// Config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Need if you need to make API calls from another server
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Primary Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/admin", adminRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Application.insertMany(ApplicationsData);
  })
  .catch((error) => console.log(`${error} did not connect`));
