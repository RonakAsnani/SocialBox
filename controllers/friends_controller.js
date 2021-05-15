const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.toggleLike = async function (req, res) {
  // try {
  //   let friends = false;
  //   let existFriend = await User.findOne(
  //     {
  //       id: req.query.id,
  //     },
  //     { friendships: { $elemMatch: { id: req.query.friend } } }
  //   );
  //   if (!existFriend) {
  //     let user = await User.findById(req.query.id);
  //     user.friendships.push(req.query.friend);
  //     await Friendship.create({
  //       from_user: req.query.id,
  //       to_user: req.query.friend,
  //     });
  //   } else {
  //     let user = await User.findById(req.query.id).update(
  //       {},
  //       { $pull: { friendships: req.query.friend } }
  //     );
  //     await Friendship.deleteOne({
  //       from_user: req.query.id,
  //       to_user: req.query.friend,
  //     });
  //     friends = true;
  //     existFriend.remove();
  //   }
  //   return res.json(200, {
  //     message: "Request Successfull",
  //     data: {
  //       friends: friends,
  //     },
  //   });
  // } catch (err) {
  //   console.log(err);
  //   return res.json(500, {
  //     message: "Internal server error",
  //   });
  // }
};
