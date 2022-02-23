const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    JwtFromRequest: Extractjwt.fromAuthHeaderAsBearerToken,
    secretOrKey = 'Codeial'
};

passport.use(new jwtStrategy(opts, function(jwtPayload, done){
    
    User.findById(jwtPayload._id, function(err, user){
        if(err){
            console.log(`Error in finding the user from JWT`);
            return ;
        }

        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }

    })
}));

module.exports = passport;