// config/passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

// Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                // Check if a user with the same email already exists
                user = await User.findOne({ email: profile.emails[0].value });
                if (user) {
                    // Link the Google ID with the existing user
                    user.googleId = profile.id;
                    await user.save();
                } else {
                    user = new User({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        username: `${profile.name.givenName} ${profile.name.familyName}`,
                        role: 'user'
                    });
                    await user.save();
                }
            }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }
));

// Facebook OAuth strategy
passport.use(new FacebookStrategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ facebookId: profile.id });
            if (!user) {
                // Check if a user with the same email already exists
                user = await User.findOne({ email: profile.emails[0].value });
                if (user) {
                    // Link the Facebook ID with the existing user
                    user.facebookId = profile.id;
                    await user.save();
                } else {
                    user = new User({
                        facebookId: profile.id,
                        email: profile.emails[0].value,
                        username: profile.displayName,
                        role: 'user'
                    });
                    await user.save();
                }
            }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }
));
