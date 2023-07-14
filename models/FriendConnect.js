const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
});

const friendConnectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    friends: [friendSchema],
  },
  { timestamps: true }
);

const friendConnect = mongoose.model("friendConnect", friendConnectSchema);

module.exports = friendConnect;
