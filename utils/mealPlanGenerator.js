const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/User');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const calculateTDEE = (user) => {
    let bmr;
    if (user.gender === 'male') {
        bmr = 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age);
    } else {
        bmr = 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
    }
    const activityMultipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very active': 1.9
    };
    return Math.round(bmr * activityMultipliers[user.activityLevel]);
};

exports.generateMealPlan = async (user, planType) => {
    const tdee = calculateTDEE(user);
    let targetCalories;
    if (user.goal === 'lose') {
        targetCalories = tdee - 500;
    } else if (user.goal === 'gain') {
        targetCalories = tdee + 500;
    } else {
        targetCalories = tdee;
    }
    const uniqueSeed = new Date().getTime();


    const dietaryText = user.isVegetarian ? 'The meals must be strictly vegetarian.' : 'The meals can include meat, poultry, and fish.';

    // Prompt structure for daily plan
    let dailyPlanPrompt = `
        Create a 3-meal plan for a day (breakfast, lunch, and dinner) for a person with the following details.
        The **total daily calorie intake for all three meals combined must be as close as possible to ${targetCalories} kcal.**
        The meals should be balanced to meet the target calories.
        
        **CRITICAL INSTRUCTION:** The **total daily calorie intake for all three meals combined MUST be EXACTLY ${targetCalories} kcal. If not exactly, it should be within a very narrow range of +/- 50 kcal.**
        ${dietaryText}
        Each meal should have a realistic recipe with ingredients and step-by-step instructions.
       
        At least one meal must feature a traditional Indian dish (e.g., poha, idli, dal, roti, curry, biryani, dosa, etc.).
        Ensure cuisines are varied — mix Indian and non-Indian meals in the day.
        Do NOT repeat any recipe in the same plan.
        When generating a new plan, do not reuse recipes from previous responses, even if the unique ID changes.

        For each recipe, include a high-quality, relevant image URL from a reliable source like Unsplash, Pexels, or a similar royalty-free image provider. The image URL should be direct and link to the image file itself (e.g., ending in .jpg, .png).
        
        User Profile:
        - Gender: ${user.gender}
        - Age: ${user.age}
        - Weight: ${user.weight} kg
        - Height: ${user.height} cm
        - Activity Level: ${user.activityLevel}
        - Goal: ${user.goal}

        Unique ID: ${uniqueSeed}

        Provide the output as a single, clean JSON array of three objects. Do not include any additional text, markdown, or explanations outside of the JSON array.
        
        The JSON structure MUST be an array of three objects.
        Each object in the array represents a meal and MUST have the following properties:
        - "mealType": "Breakfast", "Lunch", or "Dinner"
        - "recipe": {
            - "title": "Recipe Name"
            - "description": "Short description of the recipe."
            - "ingredients": ["ingredient 1", "ingredient 2", ...]
            - "instructions": ["step 1", "step 2", ...]
            - "nutritionInfo": {
                - "calories": number
                - "protein": number
                - "carbs": number
                - "fats": number
            }
            - "imageUrl": "URL of the recipe image"
        }
    `;


    // Prompt structure for weekly plan
    let weeklyPlanPrompt = `
        Create a balanced 7-day (Monday to Sunday) meal plan for a person with the following details.
        The **total daily calorie intake for each day must be as close as possible to ${targetCalories} kcal.**
        Each day's plan should consist of 3 meals: breakfast, lunch, and dinner.
        
        ${dietaryText}
        Each meal should have a realistic recipe with ingredients and step-by-step instructions.
        

        For each recipe, include a high-quality, relevant image URL from a reliable source. The image URL should be direct and link to the image file itself (e.g., ending in .jpg, .png).

        User Profile:
        - Gender: ${user.gender}
        - Age: ${user.age}
        - Weight: ${user.weight} kg
        - Height: ${user.height} cm
        - Activity Level: ${user.activityLevel}
        - Goal: ${user.goal}
        
        The recipes must be varied across the week. Do not repeat recipes. Unique ID: ${uniqueSeed}
        
        Provide the output as a single, clean JSON object with a 'weeklyPlan' property. Do not include any additional text, markdown, or explanations outside of the JSON object.
        
        The JSON structure MUST be an object with a single property:
        - "weeklyPlan": [
            {
                "day": "Monday",
                "meals": [
                    {
                        "mealType": "Breakfast",
                        "recipe": { ... }
                    },
                    {
                        "mealType": "Lunch",
                        "recipe": { ... }
                    },
                    {
                        "mealType": "Dinner",
                        "recipe": { ... }
                    }
                ]
            },
            // ... similar structure for Tuesday to Sunday
        ]
    `;

    try {
        const prompt = planType === 'weekly' ? weeklyPlanPrompt : dailyPlanPrompt;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        let mealPlanData;
        try {
            mealPlanData = JSON.parse(text);
        } catch (parseError) {
            console.error('Failed to parse JSON from Gemini API:', parseError.message);
            console.error('Gemini API raw response:', text);
            throw new Error('Could not parse JSON response from Gemini API.');
        }

        // Return the appropriate data structure based on plan type
        if (planType === 'weekly') {
            // Validate weekly plan structure
            if (!mealPlanData.weeklyPlan || !Array.isArray(mealPlanData.weeklyPlan) || mealPlanData.weeklyPlan.length !== 7) {
                console.error('Generated meal plan is not a valid weekly plan:', mealPlanData);
                throw new Error('Generated weekly meal plan is not valid.');
            }
            return { tdee, meals: mealPlanData };
        } else {
            // Validate daily plan structure
            if (!Array.isArray(mealPlanData) || mealPlanData.length !== 3) {
                console.error('Generated meal plan is not a valid daily plan:', mealPlanData);
                throw new Error('Generated daily meal plan is not valid.');
            }
            return { tdee, meals: mealPlanData };
        }

    } catch (error) {
        console.error('Error generating meal plan with Gemini API:', error.message);
        throw new Error('Failed to generate meal plan with AI.');
    }
};





