// Load environment variables immediately
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------
// 1. DATABASE CONNECTION
// ---------------------------
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    });

// ---------------------------
// 2. CORE MIDDLEWARE
// ---------------------------
app.use(cors()); 
app.use(express.json()); 

// ---------------------------
// 3. API ROUTES (MAPPING)
// ---------------------------
// NOTE: These files (authRoutes.js, aiRoutes.js) must be created next, 
// but the server can start without them if they are empty files.
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);     

// Simple root check
app.get('/', (req, res) => {
    res.send('Sahayak AI Backend is Active.');
});

// ---------------------------
// 4. START SERVER
// ---------------------------
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});