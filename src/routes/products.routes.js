// src/routes/products.routes.js


import { Router } from "express";
import { Op } from "sequelize";
import { sequelize } from "../db.js";
import { Products } from "../models/products.js";
import { verifyToken, isAdminOrSuperAdmin } from "../middlewares/authMiddleware.js";
import Orders from "../models/orders.js"

const router = Router();


// Crear producto (solo admin o superAdmin)
router.post("/", verifyToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    // ✅ Validación de campos obligatorios
    const { name, price, brand, category, stock } = req.body;
    if (!name || !price || !brand || !category) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const product = await Products.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Obtener todos los productos (público)
router.get("/", async (req, res) => {
  try {
    const { brand, category, minPrice, maxPrice, sortByPrice } = req.query;

    const where = {};

    if (brand && brand !== "all") {
      where.brand = brand;
    }
    if (category && category !== "all") {
      where.category = category;
    }

    if (minPrice && maxPrice) {
      where.price = { [Op.between]: [Number(minPrice), Number(maxPrice)] };
    } else if (minPrice) {
      where.price = { [Op.gte]: Number(minPrice) };
    } else if (maxPrice) {
      where.price = { [Op.lte]: Number(maxPrice) };
    }

    let order = [];
    if (sortByPrice === "asc") order.push(["price", "ASC"]);
    else if (sortByPrice === "desc") order.push(["price", "DESC"]);

    const products = await Products.findAll({ where, order });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Obtener todos los pedidos (solo admin o superAdmin)
router.get("/all", verifyToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const allOrders = await Orders.findAll(); // o la lógica que uses para obtenerlos
    res.json(allOrders);
  } catch (error) {
    console.error("Error al obtener todos los pedidos:", error);
    res.status(500).json({ error: "No se pudieron obtener los pedidos" });
  }
});

// Crear nuevo pedido
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, city, address, items, total } = req.body;

    const userEmail = req.user.email;

    if (!name || !city || !address || !items || !total) {
      return res.status(400).json({ error: "Faltan datos del pedido" });
    }

    const newOrder = await Orders.create({
      name,
      city,
      address,
      date: new Date().toISOString(),
      items, // asegurate que tu modelo lo permita
      total,
      email: userEmail, // desde token decodificado
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ error: "No se pudo guardar el pedido" });
  }
});


// Obtener marcas únicas (público)
router.get("/brands", async (req, res) => {
  try {
    const brands = await Products.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("brand")), "brand"]],
    });
    const brandList = brands.map((b) => b.brand);
    res.json(brandList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener producto por ID (público)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Products.findByPk(id);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

// Actualizar producto (solo admin o superAdmin)
router.put("/:id", verifyToken, isAdminOrSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const [updated] = await Products.update(req.body, { where: { id } });
  if (!updated) return res.status(404).json({ error: "No se pudo actualizar" });
  res.json({ message: "Producto actualizado" });
});

// Eliminar producto (solo admin o superAdmin)
router.delete("/:id", verifyToken, isAdminOrSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const deleted = await Products.destroy({ where: { id } });
  if (!deleted) return res.status(404).json({ error: "No se pudo eliminar" });
  res.json({ message: "Producto eliminado" });
});

export default router;
