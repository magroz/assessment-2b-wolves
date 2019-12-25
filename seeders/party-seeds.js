// Подключаем mongoose.
const mongoose = require('mongoose');
const moment = require('moment');

mongoose.connect('mongodb://localhost:27017/party', { useNewUrlParser: true, useUnifiedTopology: true });

const Party = require('../models/party');

const now = moment();
const parties = [
  {
    title: 'Salsify',
    body: 'Москва',
    startsAt: now.add('days', 9),
  },
  {
    title: 'Kohlrabi',
    body: 'Москва',
    startsAt: now.add('days', 5),
  },
  {
    title: 'Lotus',
    body: 'Москва',
    startsAt: now.add('days', 3),
  },
  {
    title: 'test',
    body: 'Москва',
    startsAt: now.add('days', 9),
  },
];


Party.insertMany(parties).then(() => {
  mongoose.connection.close();
});
