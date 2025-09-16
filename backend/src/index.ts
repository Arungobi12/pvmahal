import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON in the request body

// API Routes
app.use('/api/contact', contactRoutes);

// Use JSON file-based booking routes if MongoDB is not available
try {
  const bookingRoutes = require('./routes/bookingRoutes.json');
  app.use('/api/bookings', bookingRoutes.default);
  console.log('✅ Using JSON file storage for bookings');
} catch (error) {
  console.log('⚠️  JSON file routes not found, trying MongoDB routes...');
  try {
    const bookingRoutes = require('./routes/bookingRoutes');
    app.use('/api/bookings', bookingRoutes.default);
  } catch (mongoError) {
    console.log('❌ Both MongoDB and JSON file routes failed');
  }
}

// A simple root route to check if the server is running
app.get('/', (req: Request, res: Response) => {
  res.send('PV Mahal Backend is running!');
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'PV Mahal Backend is healthy',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});