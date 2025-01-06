const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const mediaRoutes = require('./routes/mediaRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('Database Connection Error:', err);
    process.exit(1); 
  });

// CORS Configuration
const allowedOrigin = process.env.FRONTEND_URL || '*'; 

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

// Middleware
app.use(express.json());
app.use('/api/media', mediaRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
