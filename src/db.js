// src/config/database.js
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('PetCareShop', 'root', 'M46446532S', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
