import { Router } from "express";
import {
  newProduct,
  allProducts,
  oneProduct,
  UpdateProduct,
  DeleteProduct,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
router.use(authMiddleware);

router.post("/add", newProduct);
router.get("/get", allProducts);
router.post("/find", oneProduct);
router.put("/update", UpdateProduct);
router.post("/delete", DeleteProduct);

export default router;
