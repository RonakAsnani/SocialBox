const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req,res){
    //console.log(req.cookies);
    //res.cookie("user_id",25);

    // Post.find({},function(err,posts){
    //     return res.render('home.ejs',{
    //         title: "SocialBox: Home",
    //         posts: posts
    //     })
    // })

    Post.find({})
    .populate('user')
    .populate(({
        path:'comments',
        populate:{
            path: 'user'
        }
    }))
    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home.ejs',{
                title: "SocialBox: Home",
                posts: posts,
                all_users: users
            })
        })


        
    })

    // return res.render('home.ejs',{
    //     title: "home"
    // })
}

