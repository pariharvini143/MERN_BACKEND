// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- MongoDB connection ---
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected Successfully!'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// --- Import Models ---
require('./models/User');
require('./models/MealPlan');
require('./models/Recipe');
require('./models/Allergy');
require('./models/Weakness');

// --- Import Routes ---
const authRoutes = require('./routes/authRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const userRoutes = require('./routes/userRoutes');



// --- Connect Routes With app ---
app.use('/api/auth', authRoutes);
app.use('/api/mealplans', mealPlanRoutes)
app.use('/api/users', userRoutes);


// --- Test Route ---
app.get('/', (req, res) => {
    res.send('API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));