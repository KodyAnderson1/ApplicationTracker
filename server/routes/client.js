import { getApplications } from "../controllers/client.js";

import express from "express";

const router = express.Router();

router.get("/applications", getApplications);

/* THESE NEED TO BE IMPLEMENTED AND IMPORTED */
// router.post("/applications/add", addNewApplication);
// routser.post("/applications/update/:id", updateExistingApplication);

export default router;
