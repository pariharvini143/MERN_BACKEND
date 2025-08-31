// // server/config/passport-setup.js
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/User'); // तुम्हारा User मॉडल

// // .env फ़ाइल से Google OAuth क्रेडेंशियल लोड करें
// require('dotenv').config();

// // Passport Serialize User: यह तय करता है कि उपयोगकर्ता के किस हिस्से को सत्र में संग्रहीत किया जाना चाहिए।
// // हम उपयोगकर्ता ID को सत्र में संग्रहीत करेंगे।
// passport.serializeUser((user, done) => {
//     done(null, user.id); // MongoDB की _id फ़ील्ड
// });

// // Passport Deserialize User: जब कोई अनुरोध आता है, तो यह सत्र से संग्रहीत ID का उपयोग करके
// // उपयोगकर्ता ऑब्जेक्ट को पुनः प्राप्त करता है।
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

// // GoogleStrategy को कॉन्फ़िगर करें
// passport.use(
//     new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: process.env.GOOGLE_CALLBACK_URL // यह वही URL है जो तुमने Google Cloud Console में जोड़ा है
//     }, async (accessToken, refreshToken, profile, done) => {
//         // यह फ़ंक्शन तब चलता है जब Google से प्रमाणीकरण सफल होता है।
//         // हमें यहाँ उपयोगकर्ता को डेटाबेस में सहेजना या खोजना है।

//         console.log('Google Profile:', profile); // डीबगिंग के लिए Google प्रोफाइल डेटा देखें

//         try {
//             // डेटाबेस में उपयोगकर्ता को googleId द्वारा खोजें
//             let currentUser = await User.findOne({ googleId: profile.id });

//             if (currentUser) {
//                 // यदि उपयोगकर्ता पहले से मौजूद है, तो उसे लौटा दें
//                 console.log('User already exists:', currentUser.email);
//                 done(null, currentUser);
//             } else {
//                 // यदि उपयोगकर्ता नया है, तो एक नया उपयोगकर्ता बनाएं
//                 const newUser = new User({
//                     googleId: profile.id,
//                     // Google प्रोफाइल से नाम और ईमेल प्राप्त करें
//                     name: profile.displayName,
//                     email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
//                     // पासवर्ड को खाली छोड़ दें क्योंकि यह Google ऑथेंटिकेशन है
//                     password: '' // या इसे अनुपस्थित रहने दें, लेकिन स्कीमा के आधार पर
//                 });
//                 await newUser.save();
//                 console.log('New user created:', newUser.email);
//                 done(null, newUser);
//             }
//         } catch (err) {
//             console.error('Error during Google authentication callback:', err);
//             done(err, null);
//         }
//     })
// );

// // यह फ़ाइल कोई सीधे निर्यात नहीं करती, यह बस Passport को कॉन्फ़िगर करती है।
// // इसे server/app.js में 'require' या 'import' किया जाएगा।


// server/config/passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Your User model

// .env file سے Google OAuth क्रेडेंशियल लोड करें
require('dotenv').config();

// Passport Serialize User: Determines which user portion should be stored in the session.
// We will store the user ID in the session.
passport.serializeUser((user, done) => {
    done(null, user.id); // MongoDB's _id field
});

// Passport Deserialize User: When a request comes in, it retrieves the user object
// using the ID stored in the session.
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Configure the GoogleStrategy
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        // This function runs when authentication from Google is successful.
        // We need to save or find the user in the database here.

        console.log('Google Profile:', profile); // See Google profile data for debugging

        try {
            // 1. Check if user already exists with this Google ID
            let currentUser = await User.findOne({ googleId: profile.id });

            if (currentUser) {
                // If user already exists with googleId, return them
                console.log('User logged in via Google (existing GoogleId):', currentUser.email);
                done(null, currentUser);
            } else {
                // 2. If no user found by googleId, check if a user exists with this email
                const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

                if (userEmail) {
                    let existingUserByEmail = await User.findOne({ email: userEmail });

                    if (existingUserByEmail) {
                        // User exists with this email (e.g., from OTP or traditional login)
                        // Link their Google ID to this existing account
                        existingUserByEmail.googleId = profile.id;
                        // Also update name if it's currently a default like "New User"
                        if (existingUserByEmail.name === existingUserByEmail.email.split('@')[0] || existingUserByEmail.name === 'New User') {
                            existingUserByEmail.name = profile.displayName;
                        }
                        await existingUserByEmail.save();
                        console.log('Existing user linked with Google ID:', existingUserByEmail.email);
                        done(null, existingUserByEmail);
                    } else {
                        // 3. No user found by googleId or email, so it's a truly new user
                        const newUser = new User({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: userEmail,
                            password: '' // Set to empty string for Google authenticated users
                        });
                        await newUser.save();
                        console.log('New user created via Google:', newUser.email);
                        done(null, newUser);
                    }
                } else {
                    // This case should be rare, but handle if email is not provided by Google
                    console.error('Google profile did not provide an email address.');
                    done(new Error('Google profile did not provide an email address.'), null);
                }
            }
        } catch (err) {
            console.error('Error during Google authentication callback:', err);
            done(err, null);
        }
    })
);

// This file does not directly export anything; it simply configures Passport.
// It will be 'required' or 'imported' in server/app.js.
