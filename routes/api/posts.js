const express = require("express");
const router = express.Router();

// route GET api/posts
// this is test toute
router.get("/", (req, res) => res.send("Posts route"));

module.exports = router;
