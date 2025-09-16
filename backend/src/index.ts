import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes';
import bookingRoutes from './routes/bookingRoutes';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON in the request body

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/bookings', bookingRoutes);

// A simple root route to check if the server is running
app.get('/', (req: Request, res: Response) => {
  res.send('PV Mahal Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});