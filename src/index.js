//index js

import express from "express";
import cors from "cors";
import { sequelize } from "./db.js";           // DB productos
import { sequelize as userDB } from "./dbUser.js"; // DB usuarios
import productRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.js";
import { createInitialAdmins } from './utils/initAdmins.js';
import "./models/products.js";
import "./models/user.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

const PORT = 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await userDB.authenticate();   // autenticar también la base de usuarios

    console.log("Bases de datos conectadas.");

    await sequelize.sync({ alter: true });
    await userDB.sync({ alter: true });

    await createInitialAdmins(); // Crear admin y superAdmin si no existen

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();
