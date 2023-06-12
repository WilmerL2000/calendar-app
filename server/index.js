import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import connectDB from './mongodb/connect.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(morgan('common'));

app.use(cors());

// *Routes
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 6001;

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
