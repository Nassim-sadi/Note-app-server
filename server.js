const express = require('express');
const morgan = require('morgan');
const path = require('path');
const connectDb = require('./config/db');
const exhbs = require('express-handlebars');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const app = express();
const flash = require('express-flash');

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
// //load config
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config({ path: 'config/config.env' });
// }
//passport config
require('./config/passport')(passport);
//connect to Database
connectDb();
//helpers

const { formatDate, truncate, stripTags, raw } = require('./helpers/hbs');
const hbs = exhbs.create({
  extname: '.hbs',
  helpers: { formatDate, truncate, stripTags, raw },
});

//View Engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './views');

//logging
if (process.env.NODE_ENV === 'development') {
}
app.use(morgan('dev'));
//session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    }),
  })
);
app.use(flash());
//session
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));
//static folder
app.use(express.static(path.join(__dirname + '/public')));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
const port = process.env.PORT || 3000;

//start server
app.listen(port, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`));
