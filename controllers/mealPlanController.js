


// server/controllers/mealPlanController.js
const User = require('../models/User');
const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');
const { generateMealPlan } = require('../utils/mealPlanGenerator');

// @desc    Generate a new meal plan
// @route   POST /api/mealplans/generate
exports.generateNewMealPlan = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // generateMealPlan से सही डेटा स्ट्रक्चर को डीकंस्ट्रक्ट करो
        const { tdee, meals } = await generateMealPlan(user);

        // Check if meals array is valid before proceeding
        if (!meals || !Array.isArray(meals) || meals.length === 0) {
            return res.status(500).json({ msg: 'Failed to generate a valid meal plan from AI.' });
        }

        // Save generated recipes to the database
        const savedRecipes = await Promise.all(
            meals.map(async (meal) => {
                const recipeData = meal.recipe; // recipe data को meal object से निकालो
                const newRecipe = new Recipe({
                    user: user._id,
                    title: recipeData.title,
                    description: recipeData.description,
                    ingredients: recipeData.ingredients,
                    instructions: recipeData.instructions,
                    nutritionInfo: recipeData.nutritionInfo
                });
                return await newRecipe.save();
            })
        );
        
        // Update meals with saved recipe IDs
        const updatedMeals = meals.map((meal, index) => ({
            mealType: meal.mealType,
            recipe: savedRecipes[index]._id // recipe ID को meal object में जोड़ो
        }));

        // Check if meal plan already exists for the user and update or create
        let mealPlanDoc = await MealPlan.findOne({ user: user._id });

        if (mealPlanDoc) {
            mealPlanDoc.date = new Date();
            mealPlanDoc.meals = updatedMeals;
            mealPlanDoc.tdee = tdee;
            await mealPlanDoc.save();
        } else {
            mealPlanDoc = new MealPlan({
                user: user._id,
                tdee: tdee,
                meals: updatedMeals
            });
            await mealPlanDoc.save();
        }

        // Final meal plan document को front-end पर वापस भेजो
        const finalMealPlan = await MealPlan.findById(mealPlanDoc._id).populate('meals.recipe');

        return res.status(200).json(finalMealPlan); 
    } catch (err) {
        console.error('Meal plan generation failed:', err);
        return res.status(500).json({ message: 'Error generating meal plan.', error: err.message });
    }
};

// @desc    Get user's meal plan
// @route   GET /api/mealplans/me
exports.getMealPlan = async (req, res) => {
    try {
        const mealPlan = await MealPlan.findOne({ user: req.user.id })
            .populate({
                path: 'meals.recipe',
                model: 'Recipe'
            });

        if (!mealPlan) {
            return res.status(404).json({ msg: 'No meal plan found for this user.' });
        }
        
        res.json(mealPlan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Generate a shopping list from the current meal plan
// @route   GET /api/meal-plans/shopping-list
exports.getShoppingList = async (req, res) => {
    try {
        const mealPlan = await MealPlan.findOne({ user: req.user.id }).populate('meals.recipe');

        if (!mealPlan) {
            console.log('No meal plan found for this user.');
            return res.status(404).json({ msg: 'No meal plan found for this user.' });
        }

        console.log('Meal Plan fetched:', JSON.stringify(mealPlan, null, 2));

        const ingredients = new Set();
        
        // Handle 'daily' plan type
        if (mealPlan.planType === 'daily') {
            mealPlan.meals.forEach(meal => {
                if (meal.recipe && meal.recipe.ingredients) {
                    meal.recipe.ingredients.forEach(ingredient => ingredients.add(ingredient));
                }
            });
        } 
        // Handle 'weekly' plan type (if you have one)
        else if (mealPlan.planType === 'weekly') {
            mealPlan.weeklyPlan.forEach(day => {
                day.meals.forEach(meal => {
                    if (meal.recipe && meal.recipe.ingredients) {
                        meal.recipe.ingredients.forEach(ingredient => ingredients.add(ingredient));
                    }
                });
            });
        }

        const shoppingList = Array.from(ingredients);
        console.log('Final shopping list:', shoppingList);

        res.status(200).json({ shoppingList });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};