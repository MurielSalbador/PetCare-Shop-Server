import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRoles } from "../enums/enums.js"; 

dotenv.config();

// Registro de usuario
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Este email ya se encuentra registrado." });
    }

    const hash = await bcrypt.hash(password, 10);

    const assignedRole = UserRoles.USER;  // Siempre usuario común al registrar

    const user = await User.create({
      username,
      email,
      password: hash,
      role: assignedRole,
    });

    res.status(201).json({ id: user.id, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar el usuario." });
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    if (user.isBlocked == 1 || user.isBlocked === true || user.isBlocked == "1" ) {
      return res.status(403).json({ error: "Este usuario está bloqueado." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Contraseña / correo incorrectos" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "rubio2025",
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al iniciar sesión." });
  }
};

