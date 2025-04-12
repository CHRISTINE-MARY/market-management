import { Router } from "express";
import productRoutes from "./product.route.js";
import salesRoutes from "./sales.route.js";
import authRoutes from "./auth.route.js";
const router = Router();

router.use("/product", productRoutes);
router.use("/sale", salesRoutes);
router.use("/auth", authRoutes);

export default router;
