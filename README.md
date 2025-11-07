
# 🌸 Travel Ecommerce - Viajes con Isa ✈️

Plataforma full-stack de reservas de viajes con autenticación JWT, integración de pagos con **Mercado Pago**, y base de datos **MongoDB Atlas**.  
Desarrollada con **React (Vite)** para el frontend y **Node.js + Express** para el backend.

---

## 🚀 Funcionalidades principales

- 🧳 Catálogo de destinos turísticos
- 🛒 Carrito de compras con cálculo de total
- 💳 Integración con **Mercado Pago** (modo test)
- 👤 Registro e inicio de sesión de usuarios con **JWT**
- 📅 Creación, visualización y cancelación de reservas
- 🧠 Conexión con base de datos **MongoDB Atlas**
- 🌐 Despliegue completo en **Render**

---

## 🧩 Tecnologías utilizadas

### 🔹 Frontend
- React + Vite
- React-Bootstrap
- Axios
- SweetAlert2
- React Router DOM

### 🔹 Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- Mercado Pago SDK

---

## ⚙️ Instalación y configuración local

### 1️⃣ Clona el repositorio

``bash
git clone https://github.com/isabel-espinoza-bravo/Proyecto-Final-Full-Stack.git
cd Proyecto-Final-Full-Stack

2️⃣ Instala dependencias

Backend:

cd backend
npm install


Frontend:

cd ../frontend
npm install

3️⃣ Configura las variables de entorno

Crea un archivo .env dentro de la carpeta backend/ con el siguiente contenido:

PORT=4000
MONGO_URI=tu_cadena_de_conexion_mongodb_atlas
JWT_SECRET=tu_secreto_seguro
MP_ACCESS_TOKEN=tu_token_de_acceso_mercadopago


💡 Puedes obtener tu token de Mercado Pago desde
https://www.mercadopago.com/developers/panel

4️⃣ Ejecuta el proyecto en local

En una terminal:

cd backend
npm run dev


En otra terminal:

cd frontend
npm run dev


Luego abre:
👉 http://localhost:5173

🌍 Despliegue en Render
🔹 Backend

Conecta tu repositorio a Render.

Selecciona la carpeta backend.

Build Command: npm install

Start Command: npm start

Agrega las variables de entorno de tu .env en Render.

🔹 Frontend

Crea un nuevo servicio Web estático.

Root Directory: frontend

Build Command: npm run build

Publish Directory: dist

Start Command: (Render lo infiere automáticamente)

Asegúrate de incluir este archivo en tu carpeta frontend/public/_redirects:

/*    /index.html   200


Esto evita que Render muestre pantalla negra en rutas como /success o /perfil.

💳 Pruebas con Mercado Pago

Usa las tarjetas de prueba oficiales:

Tipo	Número	Vencimiento	CVV
Aprobado	5031 7557 3453 0604	11/25	123
Rechazado	4916 0064 5810 1236	11/25	123

⚠️ Usa cualquier nombre y correo electrónico de prueba.

🧠 URLs en Render
Servicio	URL
🌐 Frontend (React)	https://travel-ecommerce-viajes-con-isa-kvb2.onrender.com

🧠 Backend (API)	https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com

Asegúrate de que tu frontend use el backend Render en los archivos:

Checkout.jsx

Success.jsx

Perfil.jsx

Ejemplo:

await axios.post("https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/payments/create_preference", {...})

🧾 Créditos

Proyecto final Full Stack desarrollado por
Isabel Espinoza Bravo 💕
Bootcamp UDD — 2025

🧩 Licencia

Este proyecto es de uso educativo.
Puedes modificarlo y adaptarlo para tus propios fines personales o de aprendizaje.

