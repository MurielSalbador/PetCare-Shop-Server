// src/config/database.js
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('PetCareShop', 'root', 'usuario32', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
