// src/seeders/seedProducts.js
import { Products } from "../models/products.js";

export const seedProducts = async () => {
  const count = await Products.count();
  if (count > 0) return; // ya hay productos, no hace falta cargar nada

  const defaultProducts = [
    {
      title: "Alimento",
      brand: "Purina",
      price: 8500,
      stock: 3,
      imageUrl: "https://jumboargentina.vtexassets.com/arquivos/ids/760143/Alimento-Para-Perros-Pedigree-15-Kg-1-16827.jpg?v=638048145790570000",
      available: true,
    },
    {
      title: "Collar",
      brand: "Bayer",
      price: 3200,
      stock: 5,
      imageUrl: "https://static.bidcom.com.ar/publicacionesML/productos/COLLA11X/1000x1000-COLLA11N.jpg",
      available: true,
    },
    {
      title: "Juguete",
      brand: "PetToys",
      price: 1500,
      stock: 4,
      imageUrl: "https://d28hi93gr697ol.cloudfront.net/071e89ac-46a5-8ab3/img/Producto/1941/01-1621356792-63212adb63fab.jpeg",
      available: true,
    },
  ];

  await Products.bulkCreate(defaultProducts);
  console.log("Productos iniciales cargados en SQLite");
};
