const friendConnect = require("../models/FriendConnect");

exports.add = (req, res) => {
  try {
    console.log("req", req.body);
    friendConnect
      .updateOne(
        {
          userId: req.body.currentUserId.currentUser,
          "friends.id": { $ne: req.body.id },
        },

        { $push: { friends: { id: req.body.id, name: req.body.name } } },
        { upsert: true }
      )
      .then(() => {
        res.status(201).json({ message: "User added successfully!" });
      });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "User is already your friend!" });
    } else {
      res.status(500).json({ message: "Something went wrong." });
    }
  }
};
