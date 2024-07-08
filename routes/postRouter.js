const express = require('express');
const Post = require('../models/post');

const postRouter = express.Router();

postRouter.route('/')
    .get((req, res) => {
        Post.find({}, (err, posts) => {
            if(err) res.status(500).send({error: err});
            let user = (req.user)?req.user:false ;
            res.render('post/main_post', {posts: posts, pub: true, user: user});
          });
    });


postRouter.route('/:id')
    .get((req, res) => {
      Post.findById(req.params.id, (err, doc) => {
        if(err) res.status(500).send({error: err});
        let user = (req.user)?req.user:false ;

        res.render('post/fullpost', {post: doc, pub: true, user: user});
      });
    });

postRouter.route('/ajax/all')
    .post((req, res) => {
        let t = (req.body.title == 'allPosts')?'':req.body.title;
        Post.find({'title': {'$regex' : t, '$options': 'i'}}, (err, posts) => {
            if(err) res.status(500).send({error: err});
            console.log(req.body);
            let filtered_posts = posts;
            if(req.body.location != 'allPosts') {
                filtered_posts = filtered_posts.filter(post => post.location == req.body.location);
            }
            if(req.body.location != 'allPosts' && req.body.isWFH) {
                filtered_posts = filtered_posts.concat(posts.filter(post => post.isWFH == true));
            }
            if(req.body.duration != 'allPosts') {
                filtered_posts = filtered_posts.filter(post => post.duration.match(/\d+/g) <= req.body.duration.match(/\d+/g));
            }
            console.log(filtered_posts);
            res.render('post/allposts', {posts: filtered_posts, pub: true});
          
        });

    });

postRouter.route('/ajax/title/:search')
    .get((req, res) => {
        let search = req.params.search.replace(/\_/g, ' ');
        if (search == 'allPosts') search = '';
        Post.find({'title': {'$regex' : search, '$options': 'i'}}, (err, posts) => {
            if(err) res.status(500).send({error: err});
            res.render('post/allposts', {posts: posts, pub: true});
        });
    });

postRouter.route('/ajax/location/:search')
    .get((req, res) => {
        let search = req.params.search.replace(/\_/g, ' ');
        if (search == 'allPosts') search = '';
        Post.find({'location': {'$regex' : search, '$options': 'i'}}, (err, posts) => {
            if(err) res.status(500).send({error: err});
            res.render('post/allposts', {posts: posts, pub: true});
        });
    });

postRouter.route('/ajax/isWFH/:t')
    .get((req, res) => {
        let search = (req.params.t == 'yes')?{'isWFH': true}:{};
        Post.find(search, (err, posts) => {
            if(err) res.status(500).send({error: err});
            res.render('post/allposts', {posts: posts, pub: true});
        });
    });

module.exports = postRouter;