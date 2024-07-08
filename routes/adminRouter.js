const express = require('express');

const Post = require('../models/post');
const Application = require('../models/application');
  const User = require('../models/user');

const adminRouter =  express.Router();


adminRouter.route('/')
.get((req, res) => {
    res.render('admin/dashboard');
});


adminRouter.route('/newpost')
  .get((req, res) => {
    res.render('post/post-form', {internal: false});
  })
  .post((req, res) => {
    var newBody = req.body;
    newBody.skills = newBody.skills.split('#');
    console.log(newBody);
    const newPost = new Post(newBody);
    newPost.save()
      .then(res.json({message: 'Successfully Saved'})); 
  });

adminRouter.route('/post')
  .get((req, res) => {
    Post.find({}, (err, posts) => {
      if(err) res.status(500).send({error: err});
      res.render('post/main_post', {posts: posts,pub: false, user: false});
    });
  });

adminRouter.route('/post/:id')
  .get((req, res) => {
    Post.findById(req.params.id, (err, doc) => {
      if(err) res.status(500).send({error: err});
      res.render('post/fullpost', {post: doc, user: false, pub: false});
    });
  })
  .post((req, res) => {
    console.log('update called');
    var newBody = req.body;
    newBody.skills = newBody.skills.split('#');
    if(newBody.location) newBody.isWFH = false;
    console.log(newBody);
    Post.findByIdAndUpdate(req.params.id, newBody, {upsert:true}, (err, doc) => {
      if(err) res.status(500).send({error: err});
      res.json({message: 'Succesfully Updated !!'});
    });
  })
  .delete((req, res) => {
    Post.findByIdAndRemove(req.params.id, (err) => {
      if(err) res.status(500).send({error: err});
      res.json({message: 'Succesfully Deleted !!'});
    });
});

adminRouter.route('/ajax/post/:id')
  .get((req, res) => {
    Post.findById(req.params.id, (err, doc) => {
      if(err) res.status(500).send({error: err});
      res.json(doc);
    });
  });
  
adminRouter.route('/applications')
  .get((req, res) => {
    let search = (req.query.status)?{status: { $in: req.query.status}}:{};
    console.log(req.query);
    console.log(search);
    Application.find(search, (err, docs) => {
      res.render('user/dashboard', {applications: docs, pub: false, user: false});
    });
  });
  

adminRouter.route('/application/view/:id')
  .get((req, res) => {
    Application.findById(req.params.id, (err, appl) => {
      if (err) res.status(500).send({error: err});
      User.findById(appl.userId, (er, user) => {
        if (er) res.status(500).send({error: er});
        res.render('application/view-application', {app: appl, user: user, pub: false});
      });
      
    });
  });

adminRouter.route('/application/setStatus')
  .post((req, res) => {
    Application.findByIdAndUpdate(req.body.postId, {status: req.body.status}, (err, doc) => {
      if (err) res.status(500).send({error: err});
      res.json({message: 'Succesfully Updated !!'});
    });
    
  });


module.exports = adminRouter;

  //admin-password-iha123
  //
//admin@iha2580
//PS C:\christ\secondsem\ddpcv8\complete-minor-main> npm run  dev-start