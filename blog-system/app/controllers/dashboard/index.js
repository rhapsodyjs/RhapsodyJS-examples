var async = require('async');

var DashboardController = {
  mainView: 'index',
  middlewares: ['logged'],
  
  views: {

    index: function(req, res) {
      res.view({
        name: 'index',
        locals: {
          layout: 'dashboard',
          name: req.session.user.name,
          title: 'Dashboard'
        }
      });
    },

    'new-post': function(req, res) {
  		res.view({
        name: 'new-post',
        locals: {
          layout: 'dashboard',
          title: 'New post',
          action: 'create'
        }
      });
    },

    'post:create-post':  function(req, res) {
      var title = req.body.title;
      var content = req.body.content;

      var Post = Rhapsody.requireModel('Post');

      var newPost = new Post({
        title: title,
        content: content,
        author: req.session.user.id
      });

      newPost.save(function(err) {
        if(err) {
          Rhapsody.log.error(err);
          res.send('Error');
        }
        else {
          res.redirect('/dashboard/posts');
        }
      });
    },

    'edit-post': {
      action: function(req, res) {
        var Post = Rhapsody.requireModel('Post');

        Post.find(req.params.post, function(err, post) {
          if(err || !post) {
            res.send('Post not found');
          }
          else {
            res.view({
              name: 'new-post',
              locals: {
                layout: 'dashboard',
                title: 'Edit ' + post.title,
                postTitle: post.title,
                content: post.content,
                id: post.id,
                action: 'edit'
              }
            });
          }
        });
      },

      params: [':post']
    },

    'post:edit-post': function(req, res) {
      var Post = Rhapsody.requireModel('Post');

      var dataToUpdate = {
        title: req.body.title,
        content: req.body.content
      };

      Post.find(req.body.post, function(err, post) {
        if(err || !post) {
          res.send('Post not found');
        }
        else {
          post.updateAttributes(dataToUpdate, function(err) {
            if(!err) {
              res.redirect('/dashboard/post/' + req.body.post);
            }
            else {
              res.send(500);
            }
          });
        }
      });
    },

    'post:delete-post': function(req, res) {
      var Post = Rhapsody.requireModel('Post');

      Post.find(req.body.post, function(err, post) {
        if(err || !post) {
          res.send('Post not found');
        }
        else {
          post.destroy();
          res.redirect('/dashboard/posts');
        }
      });
    },

    posts: function(req, res) {
      var Post = Rhapsody.requireModel('Post');

      Post.all(function(err, posts) {
        if(err) {
          Rhapsody.log.error(err);
          res.send('Error');
        }
        else {

          var postsWithAuthorNames = [];

          async.eachSeries(posts, function(post, cb) {
              var currentPost = post;

              post.authorName(function(authorName) {
                  currentPost.author = authorName;
                  postsWithAuthorNames.push(currentPost);
                  cb();
              });

          }, function() {
              res.view({
                name: 'posts',
                locals: {
                  layout: 'dashboard',
                  title: 'Posts',
                  posts: posts
                }
              });
          });
        }
      });
    },

    post: {
      action: function(req, res) {
        var Post = Rhapsody.requireModel('Post');

        Post.find(req.params.post, function(err, post) {
          if(err || !post) {
            res.send('Post not found');
          }
          else {
            post.authorName(function(authorName) {
              res.view({
                name: 'post',
                locals: {
                  layout: 'dashboard',
                  title: post.title,
                  content: post.content,
                  authorName: authorName,
                  id: req.params.post
                }
              });
            });
            
          }
        });
      },

      params: [':post']
    }
  }
}

module.exports = DashboardController;