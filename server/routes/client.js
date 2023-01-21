import {
  getApplications,
  getDashboardStats,
  addNewAplication,
  getSingleApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/client.js";

import express from "express";

const router = express.Router();

router.get("/applications", getApplications);
router.get("/single/:id", getSingleApplication);
router.get("/dashboard/:id", getDashboardStats);

router.post("/applications/post", addNewAplication);
router.post("/applications/:id", updateApplication);

router.delete("/applications/:id", deleteApplication);

/* THESE NEED TO BE IMPLEMENTED AND IMPORTED */
// router.post("/applications/add", addNewApplication);
// routser.post("/applications/update/:id", updateExistingApplication);

export default router;
