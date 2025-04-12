import { Router } from "express";
import { newSale, todaySales } from "../controllers/sale.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
router.use(authMiddleware);

router.post("/add", newSale);
router.post("/revenue", todaySales);

export default router;
