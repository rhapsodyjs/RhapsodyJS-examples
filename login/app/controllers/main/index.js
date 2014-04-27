var crypto = require('crypto');

console.log();

var MainController = {
  mainView: 'index',
  
  views: {

    index: {
      action: 'index.html',
      middlewares: ['not-logged']
    },

    'post:login': {
    	action: function(req, res) {
    		var username = req.body.username;
    		var password = req.body.password;
    		var encryptedPassword = crypto.createHash('md5').update(password).digest('hex');

    		var User = Rhapsody.requireModel('User');

    		User.findOne({username: username}, function(err, user) {
    			if(err || !user) {
    				res.redirect('/');
    			}
          else {

            if (encryptedPassword === user.password) {
              
              req.session.user = {
                name: user.name,
                username: username
              };

              res.redirect('/info');
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
              username: username
            };

            res.redirect('/info');
          }

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