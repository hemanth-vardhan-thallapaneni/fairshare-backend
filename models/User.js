const mongoose = require("mongoose");
const generateCode = require("../utilities/generateCode");

const userSchema = new mongoose.Schema(
  {
    friendCode: {
      type: String,
      unique: true,
      default: () => {
        return generateCode();
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone_number: {
      type: Number,
      unique: true,
      sparse: true,
    },
    profile_picture: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
