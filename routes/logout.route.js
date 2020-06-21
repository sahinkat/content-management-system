const express = require('express');
const router = new express.Router();

// passport standard logout call.
router.get('/', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;
