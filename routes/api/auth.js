const express = require("express");
const router = express.Router();

// route GET api/auth
// this is test toute
router.get("/", (req, res) => res.send("Auth route"));

module.exports = router;
