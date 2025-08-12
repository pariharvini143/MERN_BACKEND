// // server/controllers/userController.js
// const User = require('../models/User');
// const Allergy = require('../models/Allergy');
// const Weakness = require('../models/Weakness');

// // @desc    Get current logged in user's data
// // @route   GET /api/users/me
// exports.getMe = async (req, res) => {
//     try {
//         // middleware से authenticated user ID मिलेगी
//         // अभी के लिए हम एक डमी यूजर ID का उपयोग करेंगे
//         const user = await User.findById(req.user.id).select('-password');
        
//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }
        
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };

// // @desc    Update user profile
// // @route   PUT /api/users/me
// exports.updateProfile = async (req, res) => {
//     const {
//         weight,
//         height,
//         age,
//         gender,
//         activityLevel,
//         goal,
//         isVegetarian,
//         isVegan
//     } = req.body;

//     try {
//         let user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }

//         // अपडेट फील्ड्स
//         user.weight = weight || user.weight;
//         user.height = height || user.height;
//         user.age = age || user.age;
//         user.gender = gender || user.gender;
//         user.activityLevel = activityLevel || user.activityLevel;
//         user.goal = goal || user.goal;
//         user.isVegetarian = isVegetarian !== undefined ? isVegetarian : user.isVegetarian;
//         user.isVegan = isVegan !== undefined ? isVegan : user.isVegan;

//         await user.save();
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };





// server/controllers/userController.js
const User = require('../models/User');

// @desc    Get current logged in user's data
// @route   GET /api/users/me
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update user profile
// @route   PUT /api/users/me
exports.updateProfile = async (req, res) => {
    const {
        weight,
        height,
        age,
        gender,
        activityLevel,
        goal,
        isVegetarian,
        isVegan,
        allergies,
        weaknesses
    } = req.body;

    const profileFields = {};
    if (weight !== undefined) profileFields.weight = weight;
    if (height !== undefined) profileFields.height = height;
    if (age !== undefined) profileFields.age = age;
    if (gender !== undefined) profileFields.gender = gender;
    if (activityLevel !== undefined) profileFields.activityLevel = activityLevel;
    if (goal !== undefined) profileFields.goal = goal;
    if (isVegetarian !== undefined) profileFields.isVegetarian = isVegetarian;
    if (isVegan !== undefined) profileFields.isVegan = isVegan;
    
    // Check if the variable exists and is a string before splitting it.
    if (allergies && typeof allergies === 'string') {
        profileFields.allergies = allergies.split(',').map(item => item.trim()).filter(item => item);
    } else {
        profileFields.allergies = [];
    }
    
    // Do the same for weaknesses.
    if (weaknesses && typeof weaknesses === 'string') {
        profileFields.weaknesses = weaknesses.split(',').map(item => item.trim()).filter(item => item);
    } else {
        profileFields.weaknesses = [];
    }

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        );
        
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};