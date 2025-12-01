import { Router } from "express";
import { getCarsByCategory } from "../controllers/categoryController.js";

const router = Router();

router.get('/carsbycategory', getCarsByCategory);

export const categoryRoutes = router;