module.exports.profile = function(req,res){
    return res.render('profile.ejs',{
        title: "profile"
    })
}
// render signup page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up.ejs',{
        title: "SocialBox | Sign Up"
    })
}
// render sign in page
module.exports.signIn = function(req,res){
    return res.render("user_sign_in",{
        title: "SocialBox | Sign Up"
    })
}