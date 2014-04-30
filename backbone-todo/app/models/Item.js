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
    toggle: function() {
      this.set('complete', !this.get('complete'));
      this.save();
    }
  },
	clientMethods: {
    
  },
	serverMethods: {},
	options: {
		allowREST: true,
		middlewares: ['ajax-only']
	}
};

module.exports = Item;