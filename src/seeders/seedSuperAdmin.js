// seedSuperAdmin.js

import bcrypt from "bcrypt";
import User from "../models/user.js";
import { UserRoles } from "../enums/enums.js";

export const seedSuperAdmin = async () => {
  const email = "superadmin@petcare.com";

  const existe = await User.findOne({ where: { email } });

  if (!existe) {
    const hashedPassword = await bcrypt.hash("clave123", 10);

    await User.create({
      username: "SuperAdmin",
      email,
      password: hashedPassword,
      role: UserRoles.SUPERADMIN,
    });

    console.log("SuperAdmin creado");
  } else {
    console.log("ℹ Ya existe el SuperAdmin");
  }
};
