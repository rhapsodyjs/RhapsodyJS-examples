module.exports = function(req, res, next) {
	res.locals.Blog = Blog;

	next();
};