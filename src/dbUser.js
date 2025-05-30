import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('PetCareShop_User', 'root', 'usuario32', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
