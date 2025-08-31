// // server/index.js
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

// dotenv.config();

// const app = express();

// // --- Middleware ---
// app.use(express.json());
// app.use(cors());

// // --- MongoDB connection ---
// const mongoURI = process.env.MONGO_URI;

// mongoose.connect(mongoURI)
//     .then(() => console.log('MongoDB Connected Successfully!'))
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//         process.exit(1);
//     });

// // --- Import Models ---
// require('./models/User');
// require('./models/MealPlan');
// require('./models/Recipe');
// require('./models/Allergy');
// require('./models/Weakness');

// // --- Import Routes ---
// const authRoutes = require('./routes/authRoutes');
// const mealPlanRoutes = require('./routes/mealPlanRoutes');
// const userRoutes = require('./routes/userRoutes');



// // --- Connect Routes With app ---
// app.use('/api/auth', authRoutes);
// app.use('/api/mealplans', mealPlanRoutes)
// app.use('/api/users', userRoutes);


// // --- Test Route ---
// app.get('/', (req, res) => {
//     res.send('API is running');
// });

// app.get('/ping', (req, res) => {
//   res.json({ message: 'pong' });
// });


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
















// // server/index.js
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const session = require('express-session'); // Import express-session
// const passport = require('passport');     // Import passport

// dotenv.config();

// const app = express();

// // --- Passport Configuration ---
// // This file sets up the Google OAuth strategy for Passport.
// // It needs to be required before passport.initialize()
// require('./config/passport-setup');

// // --- Middleware ---
// app.use(express.json()); // Body parser for JSON requests
// app.use(cors());         // Enable CORS for cross-origin requests

// // Configure express-session middleware
// // This is necessary for Passport's internal session management,
// // even when using JWT for API authentication.
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'your_secret_session_key', // A secret key for signing the session ID cookie
//     resave: false,           // Don't save session if unmodified
//     saveUninitialized: false // Don't create session until something stored
// }));

// // Initialize Passport middleware
// app.use(passport.initialize());
// // Persistent login sessions (optional for API-only with JWT, but needed for Passport's flow)
// app.use(passport.session());

// // --- MongoDB connection ---
// const mongoURI = process.env.MONGO_URI;

// mongoose.connect(mongoURI)
//     .then(() => console.log('MongoDB Connected Successfully!'))
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//         process.exit(1); // Exit process if DB connection fails
//     });

// // --- Import Models ---
// // Ensure all Mongoose models are loaded
// require('./models/User');
// require('./models/MealPlan');
// require('./models/Recipe');
// require('./models/Allergy');
// require('./models/Weakness');
// require('./models/OTP'); 

// // --- Import Routes ---
// const authRoutes = require('./routes/authRoutes');
// const mealPlanRoutes = require('./routes/mealPlanRoutes');
// const userRoutes = require('./routes/userRoutes');

// // --- Connect Routes With app ---
// // Apply authentication routes first
// app.use('/api/auth', authRoutes);
// // Apply other API routes
// app.use('/api/mealplans', mealPlanRoutes);
// app.use('/api/users', userRoutes);
// // --- Test Routes ---
// // Simple route to check if API is running
// app.get('/', (req, res) => {
//     res.send('API is running');
// });

// // Ping route for health checks
// app.get('/ping', (req, res) => {
//     res.json({ message: 'pong' });
// });

// // --- Server Start ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





const express       = require('express');
const mongoose      = require('mongoose');
const dotenv        = require('dotenv');
const cors          = require('cors');
const session       = require('express-session');
const passport      = require('passport');

dotenv.config();

const app = express();

// --- Passport Configuration ---
require('./config/passport-setup');

// --- Middleware ---
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_session_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// --- MongoDB Connection ---
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// --- Load Mongoose Models ---
require('./models/User');
require('./models/MealPlan');
require('./models/Recipe');
require('./models/Allergy');
require('./models/Weakness');
require('./models/OTP');
require('./models/Product');
require('./models/CartItem');
require('./models/Exercise');
require('./models/Order'); // ✅ Make sure this model exists

// --- Import Routes ---
const authRoutes       = require('./routes/authRoutes');
const mealPlanRoutes   = require('./routes/mealPlanRoutes');
const userRoutes       = require('./routes/userRoutes');
const productsRoutes   = require('./routes/productsRoutes');
const cartRoutes       = require('./routes/cartRoutes');
const exercisesRoutes  = require('./routes/exercisesRoutes');
const orderRoutes      = require('./routes/orderRoutes'); // ✅ Correct require

// --- Mount Routes ---
app.use('/api/auth',      authRoutes);
app.use('/api/mealplans', mealPlanRoutes);
app.use('/api/users',     userRoutes);
app.use('/api/products',  productsRoutes);
app.use('/api/cart',      cartRoutes);
app.use('/api/exercises', exercisesRoutes);
app.use('/api/orders',    orderRoutes);


// --- Health Check ---
app.get('/',  (req, res) => res.send('API is running'));
app.get('/ping', (req, res) => res.json({ message: 'pong' }));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
