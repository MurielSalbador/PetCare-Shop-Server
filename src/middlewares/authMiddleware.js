//middleware

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    console.log("Token verificado:", decoded); // 👈 log útil
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido" });
  }
};


export const isAdminOrSuperAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role === "admin" || role === "superAdmin") {
    next();
  } else {
    return res.status(403).json({ error: "Acceso denegado: solo administradores" });
  }
};
