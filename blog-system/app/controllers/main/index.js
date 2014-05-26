var crypto = require('crypto'),
    async = require('async');

var MainController = {
  mainView: 'index',

  middlewares: ['blog-info'],
  
  views: {

    index: {
      action: function(req, res) {

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
                  name: 'index',
                  locals: {
                    isLogged: (typeof req.session.user !== 'undefined'),
                    posts: postsWithAuthorNames
                  }
                });
            });
          }
        });
      }
    },

    'post:login': {
    	action: function(req, res) {
    		var username = req.body.username;
    		var password = req.body.password;
    		var encryptedPassword = crypto.createHash('md5').update(password).digest('hex');

    		var User = Rhapsody.requireModel('User');

    		User.findOne({ where: { username: username } }, function(err, user) {
    			if(err || !user) {
    				res.redirect('/');
    			}
          else {

            if (encryptedPassword === user.password) {
              
              req.session.user = {
                name: user.name,
                username: username,
                id: user.id
              };

              res.redirect('/dashboard');
            }
            else {
              res.redirect('/');
            }
          }
    		});
    	},

    	middlewares: ['not-logged']
    },

    'post:signup': {
    	action: function(req, res) {
    		var username = req.body.username;
    		var name = req.body.name;
    		var password = req.body.password;
    		var encryptedPassword = crypto.createHash('md5').update(password).digest('hex');

    		var User = Rhapsody.requireModel('User');

    		var newUser = new User({
    			username: username,
    			name: name,
    			password: encryptedPassword
    		});

    		newUser.save(function(err) {
    			if(err) {
    				Rhapsody.log.error(err);
    				res.redirect('/');
    			}
          else {
            req.session.user = {
              name: name,
              username: username,
              id: newUser.id
            };

            res.redirect('/dashboard');
          }

    		});

    	},

    	middlewares: ['not-logged']
    },

    enter: {
      action: function(req, res) {
        res.view({
          name: 'enter'
        });
      },

      middlewares: ['not-logged']
    },

    exit: {
    	action: function(req, res) {
    		req.session.destroy();

    		res.redirect('/');
    	},

    	middlewares: ['logged']
    },

    info: {
    	action: function(req, res) {
        res.view({
          name: 'info',
          locals: {
            name: req.session.user.name
          }
        });
    	},

    	middlewares: ['logged']
    }
    
  }
}

module.exports = MainController;