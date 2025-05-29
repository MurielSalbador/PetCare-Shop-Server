import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { UserRoles } from '../enums/enums.js';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

export const createInitialAdmins = async () => {
  const admins = [
    {
      username: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: UserRoles.ADMIN,
    },
    {
      username: 'superadmin',
      email: process.env.SUPERADMIN_EMAIL,
      password: process.env.SUPERADMIN_PASSWORD,
      role: UserRoles.SUPERADMIN,
    },
  ];

  for (const admin of admins) {
    const existing = await User.findOne({ where: { email: admin.email } });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await User.create({
        username: admin.username,
        email: admin.email,
        password: hashedPassword,
        role: admin.role,
      });
      console.log(`Usuario ${admin.role} creado`);
    } else {
      console.log(`Usuario ${admin.role} ya existe`);
    }
  }
};
