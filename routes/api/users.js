const express = require("express");
const router = express.Router();

// route GET api/users
// this is test toute
router.get("/", (req, res) => res.send("User route"));

module.exports = router;
