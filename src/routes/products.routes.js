// src/routes/products.routes.js
import { Router } from "express";
import { Products } from "../models/products.js";

const router = Router();

// Crear producto
router.post("/", async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Agrega en products.routes.js
router.get("/", async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Obtener producto por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Products.findByPk(id);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

// Actualizar producto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const [updated] = await Products.update(req.body, { where: { id } });
  if (!updated) return res.status(404).json({ error: "No se pudo actualizar" });
  res.json({ message: "Producto actualizado" });
});

// Eliminar producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Products.destroy({ where: { id } });
  if (!deleted) return res.status(404).json({ error: "No se pudo eliminar" });
  res.json({ message: "Producto eliminado" });
});

export default router;
