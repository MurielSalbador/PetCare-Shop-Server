// src/config/database.js
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './PetCareShop.sqlite',
  logging: false,
});
