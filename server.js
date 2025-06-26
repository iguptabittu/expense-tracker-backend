import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/route.js';

dotenv.config();
connectDB();

const app = express();

// ✅ Manually set CORS headers to allow Authorization header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://expense-tracker-frontend-sand-alpha.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ✅ Use CORS middleware with proper origin
app.use(cors({
  origin: 'https://expense-tracker-frontend-sand-alpha.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
