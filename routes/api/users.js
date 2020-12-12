const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// route POST api/users
// Register user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter email").isEmail(),
    check(
      "password",
      "Please enter password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    console.log(req.body);
    res.send("User route");
  }
);

module.exports = router;