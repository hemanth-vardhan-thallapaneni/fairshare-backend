const express = require("express");
const router = express.Router();
const friendsController = require("../controllers/friendsController");

router.post("/add", friendsController.add);

module.exports = router;
