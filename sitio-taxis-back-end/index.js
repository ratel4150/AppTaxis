
//index.js
import express from "express";
import router from "./routes/index.js"; // Cambia la extensión a .mjs

import {logger} from "./lib/logger.js";


const app = express();
const port = process.env.PORT || 3000;

// Middleware para analizar datos JSON en el cuerpo de las solicitudes
app.use(express.json());

// Usar las rutas
app.use('/', router);

app.listen(port, () => {

  logger.info(`Servidor escuchando en el puerto ${port}`);

});

