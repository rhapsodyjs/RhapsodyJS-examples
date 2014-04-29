module.exports = function(rhapsodyApp, done) {
  //Bootstrap everything you want to the app here
  //call build tasks and so on, and then call done()

  //Folder where the render engine would look for the layouts
  rhapsodyApp.app.set('views', rhapsodyApp.root + '/app/layouts');
  rhapsodyApp.app.set('layout', rhapsodyApp.root + '/app/layouts/default');
  rhapsodyApp.app.engine('hjs', require('hogan-express'));

  var Settings = rhapsodyApp.requireModel('Settings');

  global.Blog = {};

  Settings.find({}, function(err, settings) {
  	if(err || !settings) {
  		rhapsodyApp.log.error(err);
  	}
  	else {
  		for(var i in settings) {
  			Blog[settings[i].name] = settings[i].value;
  		}
  	}
    done();
  });

};