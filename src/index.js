// src/index.js
import express from "express";
import cors from "cors";
import { sequelize } from "./db.js";
import productRoutes from "./routes/products.routes.js";
import "./models/products.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con la base de datos.");
    await sequelize.sync({ alter: true }); // Usa { alter: true } en desarrollo
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();
