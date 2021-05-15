const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.toggleLike = async function (req, res) {
  try {
    let existFriend = await User.findOne({
      id: req.query.id,
      friendships: req.query.friend,
    });
    if (!existFriend) {
      let user = User.findById(req.query.id);
      user.friendships.push(req.query.friend);
      let friend = await Friendship.create({
        from_user: req.query.id,
        to_user: req.query.friend,
      });
    } else {
      let user = User.findById(req.query.id);
      user.friendships.pull(req.query.friend);

      await Friendship.deleteOne({
        from_user: req.query.id,
        to_user: req.query.friend,
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
