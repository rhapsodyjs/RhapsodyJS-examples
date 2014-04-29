var Settings = {
	attributes: {
		name: {
			type: String
		},
		value: {
			type: String
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

module.exports = Settings;