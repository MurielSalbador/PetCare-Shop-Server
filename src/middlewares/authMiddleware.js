import jwt from "jsonwebtoken";

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const secret = process.env.JWT_SECRET || "rubio2025";

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });

    req.user = user; // guardamos el payload del token para usar en siguientes middlewares o controladores
    next();
  });
};

// Middleware para verificar si el usuario es admin o superAdmin
export const isAdminOrSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const { role } = req.user;

  if (role === "admin" || role === "superAdmin") {
    return next();
  }

  return res.status(403).json({ error: "No tienes permisos para esta acción" });
};
