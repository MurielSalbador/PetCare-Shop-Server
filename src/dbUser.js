import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('PetCareShop_User', 'root', 'M46446532S', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
