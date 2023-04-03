import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// const corsOptions = {
//   origin: 'https://localhost:8080',
//   optionsSuccessStatus: 200,
//   allowedHeaders: ['Content-Type', 'Authorization']
// }

// app.use(cors(corsOptions));

app.use(cors());

app.use('/api/v1/post', createProxyMiddleware({ 
  target: 'http://localhost',
  changeOrigin: true
}));

app.use('/api/v1/dalle', createProxyMiddleware({ 
  target: 'http://localhost',
  changeOrigin: true
}));



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