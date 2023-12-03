import { createLogger, transports, format } from "winston";
const logger = createLogger({
    level: 'info', // Nivel de registro predeterminado
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    transports: [
      // Transporte para registrar en la consola
      new transports.Console(),
  
      // Transporte para registrar en un archivo
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/access.log', level: 'info' }),
    ],
  });
export default logger   