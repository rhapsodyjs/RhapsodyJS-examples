var MainController = {
  mainView: 'index',
  
  views: {

    index: function(req, res) {

      var Item = Rhapsody.requireModel('Item');

      Item.find({}, function(err, items) {
        if(err) {
          res.send('Database error');
        }
        else {

          var _ = Rhapsody.libs.lodash;

          items = (_.isArray(items) ? items : [items]);

          var filteredItems = _.map(items, function(item) {
            return _.pick(item, ['title', 'complete', '_id']);
          });

          res.view({
            name: 'index',
            locals: {
              items: filteredItems
            }
          });
        }
      });
    }
    
  }
}

module.exports = MainController;