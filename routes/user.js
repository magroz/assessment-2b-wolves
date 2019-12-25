const express = require('express');

const router = express.Router();
const Party = require('../models/party');

router.get('/:id/parties', async (req, res) => {
  const parties = await Party.find({ author: req.query.author });
  res.render('parties/index', { parties });
});

module.exports = router;
