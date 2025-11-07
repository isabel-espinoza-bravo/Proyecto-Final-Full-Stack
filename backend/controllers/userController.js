import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "El usuario ya existe" });

    const user = await User.create({ nombre, email, password });

    res.status(201).json({
      _id: user.id,
      nombre: user.nombre,
      email: user.email,
      token: generateToken(user.id, user.email), // ✅ token con email
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.compararPassword(password))) {
      res.json({
        _id: user.id,
        nombre: user.nombre,
        email: user.email,
        token: generateToken(user.id, user.email), // ✅ token con email
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) res.json(user);
  else res.status(404).json({ message: "Usuario no encontrado" });
};

