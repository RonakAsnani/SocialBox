const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title: "User Profile",
            profile_user: user
        })
    })
    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','User updated')
            return res.redirect('back');
        })
    }else{
        req.flash('error','Cannot update the user');
    }
}

// render signup page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "SocialBox | Sign Up"
    })
}

// render sign in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render("user_sign_in",{
        title: "SocialBox | Sign In"
    })
}


// get sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error','Password does not match!')
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,user){
        if(err){
            req.flash('error','User already exist')
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    req.flash('error','Cannot create user!!')
                    return;
                }
                req.flash('success','User created')
                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('error','User already exist')
            return res.redirect('back');
        }
    })

}

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have Logged out');
    return res.redirect('/');
}

