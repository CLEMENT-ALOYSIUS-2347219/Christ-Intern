const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const ajaxRouter = require('./routes/ajaxRouter');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/postRouter');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: '57a638713eff2654b9ba80e6fd9a19e5',
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser('MY SECRET'));



app.use(passport.initialize());
app.use(passport.session());

// sHsMhkSK5XSve9HA

mongoose.connect("mongodb+srv://clementaloysius2002:sHsMhkSK5XSve9HA@cluster0.vvxbjqi.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });



app.use('/static', express.static(__dirname + '/public'));

app.use('/iha-admin', require('./helper/basic-auth'), adminRouter);



app.use('/user', userRouter);


app.use('/ajax', isloged, ajaxRouter);

app.use('/internships', postRouter);


app.get('/', (req, res) => {
  let user = (req.user) ? req.user : false;
  res.render('home', { user: user, pub: true });
});
app.get('/contact', (req, res) => {
  let user = (req.user) ? req.user : false;
  res.render('contact', { user: user, pub: true });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
  console.log("Listening at port http://localhost:8000")
}
app.listen(port);



function isloged(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/user/login');
  }
}