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

import { verifyJWT } from "../middleware/verifyJWT.js";
router.use(verifyJWT);

router.get("/applications", getApplications);
router.get("/single/:id", getSingleApplication);
router.get("/dashboard", getDashboardStats);

router.post("/applications/post", addNewAplication);
router.post("/applications/:id", updateApplication);

router.delete("/applications/:id", deleteApplication);

export default router;
