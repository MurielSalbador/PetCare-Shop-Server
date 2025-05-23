// src/routes/products.routes.js
import { Router } from "express";
import { Op } from "sequelize";
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

router.get("/", async (req, res) => {
  try {
    const { brand, category, minPrice } = req.query;

    // Construimos el filtro dinámico
    const where = {};

    if (brand && brand !== "all") {
      where.brand = brand;
    }
    if (category && category !== "all") {
      where.category = category;
    }
    if (minPrice) {
      where.price = { [Op.gte]: Number(minPrice) };
    }

    const products = await Products.findAll({ where });
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
