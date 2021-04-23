const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req,email, password, done){
        // find the user and establish identity
        User.findOne({email: email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                return done(null, false);
            }
            return done(null,user);
        })
    }


));

// serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
})

// deserialize the user from the key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("errrr");
        }

        return done(null,user);
    })
});

// check if the user is authenticated

passport.checkAuthentication = function(req,res,next){
   // if user is signed in, then pass on the request to next function(controllers action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains current signed in user and we are sebding it to locals for views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;