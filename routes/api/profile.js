const express = require("express");
const router = express.Router();

// route GET api/profile
// this is test toute
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;
