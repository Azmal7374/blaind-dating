import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js'; // Import database connection
import userRoutes from './routes/userRoute.js'; // Import user routes
import matchRoutes from './routes/matchRoute.js'; // Import match routes
import chatRoutes from './routes/chatRoute.js'; // Import chat routes
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get the directory name using fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/chat', chatRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});