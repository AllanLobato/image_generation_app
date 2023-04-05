// import express from 'express';
// import * as dotenv from 'dotenv';
// import cors from 'cors';

// import connectDB from './mongodb/connect.js';
// import postRoutes from './routes/postRoutes.js';
// import dalleRoutes from './routes/dalleRoutes.js';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));

// // Middleware para redirecionar as solicitações para a API DALLE
// app.use('/api/v1/dalle', createProxyMiddleware({
//   target: 'https://localhost:8080/api/v1/dalle',
//   changeOrigin: true,
//   timeout: 60000 // 60 segundos
// }));

// // Middleware para redirecionar as solicitações para a API POST
// app.use('/api/v1/post', createProxyMiddleware({
//   target: 'https://localhost:8080/api/v1/post',
//   changeOrigin: true,
// }));

// app.get('/', async (req, res) => {
//   res.status(200).json({
//     message: 'Hello from DALL.E!',
//   });
// });

// const startServer = async () => {
//   try {
//     connectDB(process.env.MONGODB_URL);
//     app.listen(8080, () => console.log('Server started on port 8080'));
//   } catch (error) {
//     console.log(error);
//   }
// };

// startServer();

import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();