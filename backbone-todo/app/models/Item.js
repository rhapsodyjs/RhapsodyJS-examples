var Item = {
	attributes: {
		title: {
			type: String
		},
		complete: {
			type: Boolean,
			'default': false
		}
	},
	sharedMethods: {
	},
	clientMethods: {
		toggle: function() {
			this.set('complete', !this.get('complete'));
			this.save();
		}
	},
	serverMethods: {},
	options: {
		allowREST: true,
		middlewares: ['ajax-only']
	}
};

module.exports = Item;