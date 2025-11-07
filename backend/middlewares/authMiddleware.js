import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * 🔒 Middleware de protección para rutas privadas
 */
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 🔍 Verificamos el token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 🧠 Intentamos obtener el usuario desde la BD
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        console.warn("⚠️ Usuario no encontrado en BD, usando datos decodificados del token.");
        // 🔹 Usamos el email decodificado si está en el token (por compatibilidad)
        req.user = { _id: decoded.id, email: decoded.email || "sin-email@viajesisa.cl" };
      } else {
        req.user = user;
      }

      next();
    } catch (error) {
      console.error("❌ Error al verificar token:", error.message);
      res.status(401).json({ message: "Token inválido o expirado" });
    }
  } else {
    res.status(401).json({ message: "No autorizado, sin token" });
  }
};

/**
 * 🔑 Middleware para rutas de administrador
 */
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.esAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado. Solo administradores." });
  }
};

