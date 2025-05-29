import express from "express";
import {
  createProduct,
  getAllProducts,
  getUniqueBrands,
  getProductById,
  updateProduct,
  deleteProduct,
  decrementStock,
  decrementMultipleStock
} from "../controllers/productsController.js";
import { verifyToken, isAdminOrSuperAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();


//Ruta actualizar stock
router.put('/decrement-stock',verifyToken, isAdminOrSuperAdmin, decrementStock);


//ruta actualizacion multiple
router.put('/decrement-multiple', verifyToken, isAdminOrSuperAdmin, decrementMultipleStock);


// Rutas públicas
router.get("/", getAllProducts);
router.get("/brands", getUniqueBrands);
router.get("/:id", getProductById);

// Rutas protegidas para admin y superAdmin
router.post("/", verifyToken, isAdminOrSuperAdmin, createProduct);
router.put("/:id", verifyToken, isAdminOrSuperAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdminOrSuperAdmin, deleteProduct);

export default router;
