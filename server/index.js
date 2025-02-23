const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
// const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
  },
});

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// // Initialize Supabase
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Test route
app.get('/', (req, res) => {
  res.send('Blind Dating App Server is running!');
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});