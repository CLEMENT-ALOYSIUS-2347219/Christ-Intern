const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const Post = require('../models/post');
const Application = require('../models/application');
const userRouter = express.Router();


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


userRouter.route('/')
    .get(isLoggedIn, (req, res) => {
            Application.find({userId: req.user._id}, (err, docs) => {
                if (err) res.status(500).send({error: err});
                res.render('user/dashboard', {user: req.user, applications: docs, pub: true});
            });
    });

userRouter.route('/register')
    .get((req, res) => {
    res.render('user/register', {err: false, pub: true});
    })
    .post((req, res) => {
        User.register(req.body, req.body.password, function(err, user) {
            if (err) {
                console.log(err);
                res.json({err: true, error: err});
            } else {
                passport.authenticate("local") (req, res, function() {
                res.json( {err: false, msg: 'Succesfully registered!!'});
            });
        }
    });
});

userRouter.route('/login')
    .get((req, res) => {
        res.render('user/login');
    })
    .post(passport.authenticate('local'),
        function(req, res) {
            console.log('user login success');
            res.redirect(req.body.url || '/user');
});
userRouter.route('/logout')
    .get((req, res) => {
        req.logOut();
        res.redirect('/');
    });



userRouter.route('/resume')
    .get(isLoggedIn, (req, res) => {
        res.render('user/resume', {user: req.user.toJSON(), internal: false, pub: true});
    });

userRouter.route('/application/resume/:id')
    .get((req, res) => {
        Post.findById(req.params.id, (err, post) => {
            if (err) res.status(500).send({error: err});
            res.render('application/apply-resume', {user: req.user.toJSON(),pub: true, post: post});
        });
        
    });

userRouter.route('/application/form/:id')
    .get((req, res) => {
        Post.findById(req.params.id, (err, post) => {
            if (err) res.status(500).send({error: err});
            res.render('application/apply-questions', {post: post, pub: true,user: req.user});
        });    
    })
    .post((req, res) => {
        Post.findById(req.params.id, (err, doc) => {
            let newBody = req.body;
            newBody.resume = req.user.resume;
            newBody.post = doc;
            newBody.status = 'Applied';
            newApp = new Application(newBody);
            newApp.save()
                .then(setTimeout(() => {res.redirect('/user')}, 500) );
        });
    });

userRouter.route('/application/view/:id')
    .get((req, res) => {
        Application.findById(req.params.id, (err, doc) => {
            if (err) res.status(500).send({error: err});
            res.render('application/view-application', {app: doc, user: req.user, pub: true});
        });
    });

module.exports = userRouter;


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    console.log('user not authenticated');
    res.redirect('/user/login');
}