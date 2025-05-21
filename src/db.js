// src/config/database.js
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('Mayorista', 'root', 'M46446532S', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
