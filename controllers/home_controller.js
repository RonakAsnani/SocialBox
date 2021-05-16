const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "likes",
        },
        populate: {
          path: "user",
        },
      });

    // .populate("likes");

    let users = await User.find({});
    //console.log(process.env);
    return res.render("home.ejs", {
      title: "SocialBox: Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }

  // return res.render('home.ejs',{
  //     title: "home"
  // })
};
