const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    });
    return res.json(200,{
        message: "list of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
       // if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});



           // req.flash('success','Post deleted!')
            return res.json(200,{
                message: "success"
            })
      //  }else{
          //  req.flash('error','You cannot delete this post!')
        //    return res.redirect('back');
      //  }
    }catch(err){
        console.log(err);
    //     req.flash('error',err);
    //    // console.log("Error",err);
    //    return res.redirect('back');
   return res.json(500,{
       massage: "internal error"
   });
    }
   
}