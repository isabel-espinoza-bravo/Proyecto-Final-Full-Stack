import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: "El usuario ya existe" });

    const nuevoUsuario = new User({ nombre, email, password });
    await nuevoUsuario.save();

    const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, nombre: nuevoUsuario.nombre });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

    const match = await usuario.compararPassword(password);
    if (!match) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, nombre: usuario.nombre });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

export default router;

