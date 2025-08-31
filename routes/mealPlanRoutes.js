// server/routes/mealPlanRoutes.js
const express = require('express');
const { generateNewMealPlan, getMealPlan } = require('../controllers/mealPlanController');
const auth = require('../middleware/auth');


const router = express.Router();

router.post('/generate', auth, generateNewMealPlan);
router.get('/me', auth, getMealPlan);
 
module.exports = router;
