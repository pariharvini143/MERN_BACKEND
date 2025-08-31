// // server/config/passport-setup.js
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/User'); // Your User model

// // .env file سے Google OAuth क्रेडेंशियल लोड करें
// require('dotenv').config();

// // Passport Serialize User: Determines which user portion should be stored in the session.
// // We will store the user ID in the session.
// passport.serializeUser((user, done) => {
//     done(null, user.id); // MongoDB's _id field
// });

// // Passport Deserialize User: When a request comes in, it retrieves the user object
// // using the ID stored in the session.
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

// // Configure the GoogleStrategy
// passport.use(
//     new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: process.env.GOOGLE_CALLBACK_URL
//     }, async (accessToken, refreshToken, profile, done) => {
//         // This function runs when authentication from Google is successful.
//         // We need to save or find the user in the database here.

//         console.log('Google Profile:', profile); // See Google profile data for debugging

//         try {
//             // 1. Check if user already exists with this Google ID
//             let currentUser = await User.findOne({ googleId: profile.id });

//             if (currentUser) {
//                 // If user already exists with googleId, return them
//                 console.log('User logged in via Google (existing GoogleId):', currentUser.email);
//                 done(null, currentUser);
//             } else {
//                 // 2. If no user found by googleId, check if a user exists with this email
//                 const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

//                 if (userEmail) {
//                     let existingUserByEmail = await User.findOne({ email: userEmail });

//                     if (existingUserByEmail) {
//                         // User exists with this email (e.g., from OTP or traditional login)
//                         // Link their Google ID to this existing account
//                         existingUserByEmail.googleId = profile.id;
//                         // Also update name if it's currently a default like "New User"
//                         if (existingUserByEmail.name === existingUserByEmail.email.split('@')[0] || existingUserByEmail.name === 'New User') {
//                             existingUserByEmail.name = profile.displayName;
//                         }
//                         await existingUserByEmail.save();
//                         console.log('Existing user linked with Google ID:', existingUserByEmail.email);
//                         done(null, existingUserByEmail);
//                     } else {
//                         // 3. No user found by googleId or email, so it's a truly new user
//                         const newUser = new User({
//                             googleId: profile.id,
//                             name: profile.displayName,
//                             email: userEmail,
//                             password: '' // Set to empty string for Google authenticated users
//                         });
//                         await newUser.save();
//                         console.log('New user created via Google:', newUser.email);
//                         done(null, newUser);
//                     }
//                 } else {
//                     // This case should be rare, but handle if email is not provided by Google
//                     console.error('Google profile did not provide an email address.');
//                     done(new Error('Google profile did not provide an email address.'), null);
//                 }
//             }
//         } catch (err) {
//             console.error('Error during Google authentication callback:', err);
//             done(err, null);
//         }
//     })
// );

// // This file does not directly export anything; it simply configures Passport.
// // It will be 'required' or 'imported' in server/app.js.





const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();

// Serialize user: store user ID in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user: retrieve full user from DB using ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Log config for Render debugging
console.log('Google OAuth Config:', {
  clientID: process.env.GOOGLE_CLIENT_ID,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
});

// Register Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      proxy: true // ✅ Required for Render HTTPS redirects
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google Profile:', profile);

        // Step 1: Check if user exists via googleId
        let currentUser = await User.findOne({ googleId: profile.id });
        if (currentUser) {
          console.log('User logged in via Google (existing GoogleId):', currentUser.email);
          return done(null, currentUser);
        }

        // Step 2: Check if user exists via email
        const userEmail = profile.emails?.[0]?.value || null;
        if (userEmail) {
          let existingUserByEmail = await User.findOne({ email: userEmail });
          if (existingUserByEmail) {
            existingUserByEmail.googleId = profile.id;
            if (
              existingUserByEmail.name === 'New User' ||
              existingUserByEmail.name === existingUserByEmail.email.split('@')[0]
            ) {
              existingUserByEmail.name = profile.displayName;
            }
            await existingUserByEmail.save();
            console.log('Existing user linked with Google ID:', existingUserByEmail.email);
            return done(null, existingUserByEmail);
          }
        }

        // Step 3: Create new user
        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: userEmail,
          password: '' // Google-auth users don’t need password
        });
        await newUser.save();
        console.log('New user created via Google:', newUser.email);
        return done(null, newUser);
      } catch (err) {
        console.error('Error during Google authentication callback:', err);
        return done(err, null);
      }
    }
  )
);
