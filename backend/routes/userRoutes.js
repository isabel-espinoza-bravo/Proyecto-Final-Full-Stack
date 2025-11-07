import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/userController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * ✅ Registro de usuario
 * POST /api/users/register
 */
router.post("/register", registerUser);

/**
 * ✅ Login de usuario
 * POST /api/users/login
 */
router.post("/login", loginUser);

/**
 * ✅ Perfil del usuario autenticado
 * GET /api/users/profile
 * Header: Authorization: Bearer <token>
 */
router.get("/profile", protect, getProfile);

/**
 * ✅ Actualizar perfil del usuario autenticado
 * PUT /api/users/update-profile
 * Header: Authorization: Bearer <token>
 */
router.put("/update-profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Actualizar campos
    user.nombre = req.body.nombre || user.nombre;
    user.email = req.body.email || user.email;

    // Si cambia contraseña
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "✅ Perfil actualizado correctamente",
      _id: updatedUser._id,
      nombre: updatedUser.nombre,
      email: updatedUser.email,
      esAdmin: updatedUser.esAdmin,
    });
  } catch (error) {
    console.error("❌ Error al actualizar perfil:", error);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
});

/**
 * ⚙️ Ruta temporal: listar todos los usuarios (sin password)
 * GET /api/users/list
 * ⚠️ Solo para depuración. Luego eliminar o proteger.
 */
router.get("/list", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("❌ Error al listar usuarios:", error);
    res.status(500).json({ message: "Error al listar usuarios" });
  }
});

/**
 * ⚙️ Ruta temporal: crear primer administrador
 * ⚠️ Usar una sola vez. No requiere token.
 * PUT /api/users/make-admin/:email
 */
router.put("/make-admin/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.esAdmin) {
      return res.status(200).json({ message: `${user.nombre} ya es administrador.` });
    }

    user.esAdmin = true;
    await user.save();

    res.status(200).json({
      message: `✅ ${user.nombre} ahora es administrador.`,
      email: user.email,
      esAdmin: user.esAdmin,
    });
  } catch (error) {
    console.error("❌ Error al crear administrador:", error);
    res.status(500).json({ message: "Error al convertir en administrador" });
  }
});

/**
 * ✅ Versión protegida: convertir usuario en admin (solo si ya hay uno)
 * PUT /api/users/promote-admin/:email
 */
router.put("/promote-admin/:email", protect, isAdmin, async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.esAdmin) {
      return res.status(200).json({ message: `${user.nombre} ya es administrador.` });
    }

    user.esAdmin = true;
    await user.save();

    res.status(200).json({ message: `✅ ${user.nombre} ahora es administrador.` });
  } catch (error) {
    console.error("❌ Error al promover admin:", error);
    res.status(500).json({ message: "Error al convertir en administrador" });
  }
});

export default router;


