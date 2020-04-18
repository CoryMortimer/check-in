const express = require('express');
const router = express.Router();
const handleRejection = require('../middleware/handleRejection');

router.get("/", handleRejection((req, res) => {
  res.render("index", { title: "Express" });
}));

module.exports = router;
