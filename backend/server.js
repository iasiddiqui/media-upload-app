const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const mediaRoutes = require('./routes/mediaRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Database Connection Error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/media', mediaRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
