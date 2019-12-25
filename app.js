const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const userMiddleWare = require('./middleware');

const indexRouter = require('./routes/index');
const partiesRouter = require('./routes/parties');
const authenticationRouter = require('./routes/authentication');
const userRouter = require('./routes/user');


const app = express();
userMiddleWare(app);

// Подключаем mongoose.
mongoose.connect('mongodb://localhost:27017/party', { useNewUrlParser: true, useUnifiedTopology: true });


app.use((req, res, next) => {
  res.locals.isAuth = !!req.session.user;
  if (req.session.user) {
    res.locals.userName = req.session.user.username;
  }
  next();
});

// Allows you to use PUT, DELETE with forms.
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/parties', partiesRouter);
app.use('/', authenticationRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
