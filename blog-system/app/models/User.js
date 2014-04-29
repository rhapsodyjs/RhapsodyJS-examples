var User = {
	attributes: {
		username: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true,
			restricted: true
		}
	},
	sharedMethods: {},
	clientMethods: {},
	serverMethods: {},
	options: {
		allowREST: false,
		middlewares: []
	}
};

module.exports = User;