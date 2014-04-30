module.exports = function(req, res, next) {
  //Only accept a request if it's via ajax
  if(req.xhr) {
    next();
  }
  else {
    res.send(404);
  }
};