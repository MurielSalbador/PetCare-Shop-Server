import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { UserRoles } from '../enums/enums.js';

export const createInitialAdmins = async () => {
  const admins = [
    {
      username: 'admin',
      email: 'RubioHnos2025@gmail.com',
      password: 'rubiohermanos2025',
      role: UserRoles.ADMIN,
    },
    {
      username: 'superadmin',
      email: 'RubioHnos2025SA@gmail.com',
      password: 'rubiohermanosSA2025',
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
