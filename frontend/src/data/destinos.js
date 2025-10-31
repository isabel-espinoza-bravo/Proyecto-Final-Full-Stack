// Reusa los mismos datos que tienes en App.jsx para no duplicar.
// Si ya los tienes, exporta el arreglo y úsalo en Catalog/ProductDetail.
const destinos = [
  { id: 1, nombre: "Aventura en la Patagonia", descripcion: "Explora glaciares, lagos y montañas en un paisaje único.", incluye: "Vuelos + 5 noches + Desayuno", noches: 5, precio: 650000, imagenes: ["/assets/patagonia1.png","/assets/patagonia2.png"], color:"#ffeefc" },
  { id: 2, nombre: "Descubre el Desierto de Atacama", descripcion: "Vive la magia del paisaje más árido del mundo.", incluye: "Vuelos + 4 noches + Desayuno", noches: 4, precio: 520000, imagenes: ["/assets/sanpedro1.jpeg","/assets/sanpedro2.jpeg"], color:"#e6f5f8" },
  { id: 3, nombre: "La Magia de Isla de Pascua", descripcion: "Sumérgete en la historia de los Moai y su cultura.", incluye: "Vuelos + 3 noches + Desayuno", noches: 3, precio: 980000, imagenes: ["/assets/isladepascua1.png","/assets/isladepascua2.png"], color:"#fef7e6" },
  { id: 4, nombre: "Descubre Nueva York", descripcion: "Luces, cultura y vida urbana en la Gran Manzana.", incluye: "Vuelos + 5 noches + Desayuno", noches: 5, precio: 1200000, imagenes: ["/assets/nyc1.png","/assets/nyc2.png"], color:"#e6f5f8" },
  { id: 5, nombre: "Diversión en Orlando", descripcion: "Parques temáticos, sol y pura magia.", incluye: "Vuelos + 4 noches + Desayuno", noches: 4, precio: 1000000, imagenes: ["/assets/orlando1.png","/assets/orlando2.png"], color:"#fef7e6" },
  { id: 6, nombre: "Escápate a Miami", descripcion: "Playas, compras y noches tropicales.", incluye: "Vuelos + 3 noches + Desayuno", noches: 3, precio: 900000, imagenes: ["/assets/miami1.png","/assets/miami2.png"], color:"#f6eef7" },
];

export default destinos;
