const express = require('express');
const moment = require('moment');

const router = express.Router();
const Party = require('../models/party');

console.log('started parties');


// parties
router.get('/', async (req, res, next) => {
  const parties = await Party.find({ startsAt: { $gte: new Date() }}).sort({ startsAt: 1});
  res.render('parties/index', { parties });
});

router.post('/', async (req, res, next) => {
  const newParty = new Party(
    {
      title: req.body.title,
      body: req.body.body,
      startsAt: req.body.startsAt,
      author: req.session.user.username,
    },
  );
  await newParty.save();
  res.redirect(`/parties/${newParty.id}`);
});

// new parties
router.get('/new', (req, res, next) => {
  res.render('parties/new');
});

// render signup handle bars
router.get('/signup', (req, res) => {
  res.render('signup', { message: req.query.message });
});

router.get('/login', (req, res) => {
  res.render('login', { message: req.query.warningMessage });
});

router.get('/author', async (req, res) => {
  const parties = await Party.find({ author: req.session.user.username });
  res.render('parties/index', { parties });
});

// detail party
router.get('/:id', async (req, res, next) => {
  let isAuthor = false;
  const party = await Party.findById(req.params.id);
  if (req.session.user && party.author === req.session.user.username) {
    isAuthor = true;
    res.render('parties/show', { party, isAuthor });
  } else {
    party.author = party.author || 'Anonymous';
    res.render('parties/show', { party });
  }
});

router.put('/:id', async (req, res, next) => {
  const party = await Party.findById(req.params.id);

  party.title = req.body.title;
  party.body = req.body.body;
  party.startsAt = req.body.startsAt;
  await party.save();
  res.end();
});

router.delete('/:id', async (req, res, next) => {
  try {
    const response = await Party.deleteOne({ _id: req.params.id });
    console.log(response);
    if (response.ok === 1) {
      return await res.json({ success: true });
    } throw Error();
  } catch (e) {
    await res.json({ success: false });
  }
});


router.get('/:id/edit', async (req, res, next) => {
  const party = await Party.findById(req.params.id);
  const startsAtFormatHTML5 = moment(party.startsAt).format(moment.HTML5_FMT.DATETIME_LOCAL);
  console.log(`party ${party}`);
  res.render('parties/edit', { party, startsAtFormatHTML5 });
});

module.exports = router;
