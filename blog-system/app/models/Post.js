var Post = {
	attributes: {
		title: {
			type: String
		},
		content: {
			type: String
		},
		tags: {
			type: [String],
			default: []
		},
		author: {
			type: String
		}
	},
	sharedMethods: {},
	clientMethods: {},
	serverMethods: {
		authorName: function(callback) {
			var User = Rhapsody.requireModel('User');

			var _ = this;

			User.find(_.author, function(err, author) {
				if(err || !author) {
					callback('');
				}
				else {
					callback(author.name);
				}
			});
		}
	},
	options: {
		allowREST: true,
		middlewares: []
	}
};

module.exports = Post;