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
  res.header('Access-Control-Allow-Origin', 'https://expense-tracker-backend-wl36.onrender.com/');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Respond to preflight
  }
  next();
});

// ✅ Use CORS middleware for general CORS handling
app.use(cors({
  origin: 'https://expense-tracker-backend-wl36.onrender.com/',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
