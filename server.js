const http = require('http'); 
const app = require('./src/app.js');
const connectDB = require('./src/config/database.js');
const { initializeWebSocket } = require('./websocket.js');

const port = 3000; 

const server = http.createServer(app);

initializeWebSocket(server);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.log('No se ha podido levantar el servidor', error);
    process.exit(1);
  }
};

startServer();
