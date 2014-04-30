$(function() {

  var ItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'item',
    template: _.template('<input type="checkbox" <% if (complete) {%> checked="checked" <% } %>/> <%= title %> <button>x</button>'),

    events: {
      'click input': 'toggle',
      'click button': 'remove'
    },

    initialize: function() {
      var that = this;

      this.listenTo(this.model, 'change:complete', function() {
        if(that.model.get('complete')) {
          that.$el.addClass('checked');
        }
        else {
          that.$el.removeClass('checked');
        }
      });
    },

    toggle: function() {
      this.model.toggle();
    },

    remove: function() {
      if(confirm('You sure you want to delet it ?')) {
        this.model.destroy();
      }
    },

    render: function() {

      var attributes = this.model.toJSON();
      this.$el.html(this.template(attributes));

      return this;
    }
  });

  var ItemsListView = Backbone.View.extend({
    tagName: 'div',
    addButton: '<button class="add">+</button>',

    events: {
      'click button.add': 'addItem'
    },

    initialize: function() {
      $('#content').append(this.render().el);

      this.listenTo(this.collection, 'add remove', this.render);
    },

    addItem: function() {
      var title = prompt('Title:');
      var that = this;

      var model = new Item({
        title: title
      });

      model.save(model.attributes, {
        success: function() {
          that.collection.add(model);
        }
      });

    },

    render: function() {
      this.$el.empty();
      var models = this.collection.models;

      for(var model in models) {
        var itemView = new ItemView({
          model: models[model]
        });

        this.$el.append(itemView.render().el);
      }

      this.$el.append(this.addButton);

      return this;
    }
  });

  var itemsView = new ItemsListView({
    collection: items
  });

});