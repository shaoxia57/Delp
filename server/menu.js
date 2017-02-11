var mongoose = require('mongoose');

var menuSchema = mongoose.Schema({
	name: String,
	upVotes: Number,
	downVotes: Number,
});

var Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;