import Orders from "../models/orders.js";

// Obtener todos los pedidos (solo admin)
export const getAllOrders = async (req, res) => {
  try {
    console.log("Usuario:", req.user); // para ver el rol y email
    const allOrders = await Orders.findAll();
    console.log("Cantidad de pedidos:", allOrders.length); // debug

    res.json(allOrders);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ error: "Error interno" });
  }
};


// Obtener pedidos de un usuario específico
export const getOrdersByUserEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Opcional: verificar que el usuario que hace la consulta coincide con el email, o es admin
    if (req.user.email !== email && req.user.role !== "admin" && req.user.role !== "superAdmin") {
      return res.status(403).json({ error: "No autorizado para ver estos pedidos" });
    }

    const userOrders = await Orders.findAll({ where: { email } });
    res.json(userOrders);
  } catch (error) {
    console.error("Error al obtener los pedidos del usuario:", error);
    res.status(500).json({ error: "No se pudieron obtener los pedidos del usuario" });
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
