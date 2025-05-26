import Orders from "../models/orders.js";

// Obtener todos los pedidos
export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Orders.findAll();
    res.json(allOrders);
  } catch (error) {
    console.error("Error al obtener todos los pedidos:", error);
    res.status(500).json({ error: "No se pudieron obtener los pedidos" });
  }
};

// Crear nuevo pedido
export const createOrder = async (req, res) => {
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
      items,
      total,
      email: userEmail,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ error: "No se pudo guardar el pedido" });
  }
};
