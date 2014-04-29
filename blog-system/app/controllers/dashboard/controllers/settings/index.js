var SettingsController = {

	mainView: 'index',
	middlewares: ['logged'],

	views: {
		index: function(req, res) {
			res.view({
				name: 'index',
				locals: {
					layout: 'dashboard',
					title: 'Settings'
				}
			});
		},

		'post:update-name': function(req, res) {
			var newBlogName = req.body['blog-name'];

			var Settings = Rhapsody.requireModel('Settings');

			Settings.findOne({name: 'blogName'}, function(err, blogName) {
				if(err) {
					Rhapsody.log.error(err);
					res.send('Error');
				}
				else if (!blogName) {
					blogName = new Settings({
						name: 'blogName',
						value: newBlogName
					});

					blogName.save(function(err) {
						if (err) {
							res.send('Error');
						}
						else{
							//Change the global settings here
							Blog.blogName = newBlogName;
							res.redirect('/dashboard/settings');
						};
					});
				}
				else {
					blogName.value = newBlogName;
					blogName.save(function(err) {
						if (err) {
							res.send('Error');
						}
						else {
							//Change the global settings here
							Blog.blogName = newBlogName;
							res.redirect('/dashboard/settings');
						};
					});
				}
			});

		}
	}

};

module.exports = SettingsController;