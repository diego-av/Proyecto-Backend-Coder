import express, { json } from "express";
import products from "./modules/routes/productsRoute.js";
import cart from "./modules/routes/cartRoute.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(json());

app.use("/api/productos", products);

app.use("/api/carrito", cart);

const server = app.listen(PORT, () => {
  console.log(`Listen in http://localhost:${server.address().port}`);
});
