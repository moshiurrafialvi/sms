const express = require("express");
const router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId
const Post = require("../../models/Post");
// route GET api/posts
// this is test toute
router.route('/').get((req, res) => {
    Post.find()
      .then(posts => res.json(posts))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req, res) => {
    const title = req.body.title;
    const message = req.body.message;

    const newPost = new Post({
      title,
    message,
    });
  
    newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  

  router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
      .then(posts => {
        posts.title = req.body.title;
        posts.message = req.body.message;
        
    posts.save()
          .then(() => res.json('post updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
      .then(posts => res.json(posts))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then(() => res.json('Post deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;