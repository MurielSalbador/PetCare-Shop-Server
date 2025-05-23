import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('Mayorista_Usuarios', 'root', 'M46446532S', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
