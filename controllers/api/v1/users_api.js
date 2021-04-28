const User = require('../../../models/user');
const jwt = require('jsonwebtoken');



module.exports.createSession = async function(req,res){

    try{
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: "invalid username/password"
            })
        }
        return res.json(200,{
            message: "Sign in successfull, here is your token, please keep it safe",
            data:{
                token: jwt.sign(user.toJSON(),'SocialBox',{expiresIn: '100000'})
            }
        })
    }catch(err){
        console.log(err);
        //     req.flash('error',err);
        //    // console.log("Error",err);
        //    return res.redirect('back');
       return res.json(500,{
           message: "internal error"
       });
    }
}
    