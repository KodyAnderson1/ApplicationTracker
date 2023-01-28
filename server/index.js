import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import AuthRoutes from "./routes/auth.js";
import { corsOptions } from "./config/corsOptions.js";

// Config
dotenv.config();
const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Need if you need to make API calls from another server
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());

// Primary Routes

app.use("/general", generalRoutes);
app.use("/auth", AuthRoutes);
app.use("/client", clientRoutes);
// app.use("/admin", adminRoutes);

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
