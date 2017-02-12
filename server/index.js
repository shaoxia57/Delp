var express = require('express');
var mongoose = require('mongoose');
var opts = {
	server: {
		socketOptions: {keepAlive: 1}
	}
};

var app = express();

switch(app.get('env')){
	case 'development':
		mongoose.connect("mongodb://admin:abcdef@ds149059.mlab.com:49059/delp", opts);
		break;
	case 'production':
		mongoose.connect("mongodb://admin:abcdef@ds149059.mlab.com:49059/delp", opts);
		break;
	default: 
		throw new Error('Unknown execution environment: ' + app.get('env'));
}

var Menu = require("./menu.js");

app.set('port', process.env.PORT || 3000);

app.get('/*', function(req, res) {
	//res.type('text/plain');
	var query = req.query;
	var name = ( query.fetch || query.upvote ) || query.downvote;
	var savedItem;

	var dataProcess = function(alreadySaved) {
		if (!alreadySaved) {
			//console.log("try to create new");
			var newItem = new Menu({name: name, upVotes: 0, downVotes: 0});
			newItem.save(function(err, newItem) {
				if (err) {
					console.log(err);
				} else {
					console.log("saved " + newItem.name);
				}
			});
			savedItem = newItem;
		}
		if (query.fetch) {
			res.json(savedItem);
		} else if (query.upvote) {
			savedItem.upVotes += 1;
			savedItem.save(function(err) {
				if (err) {
					console.log(err);
				}
			});
			res.json(savedItem);
		} else if (query.downvote) {
			savedItem.downVotes += 1;
			savedItem.save(function(err) {
				if (err) {
					console.log(err);
				}
			});
			res.json(savedItem);
		}
	}

	if (name) {
		console.log(name);
		Menu.findOne({name: name}, function(err, data){
			//console.log("find");
			if (err) {
				console.log(err);
			} else if (! data) {
				//console.log("not found");
				savedItem = data;
				dataProcess(false);
			} else {
				//console.log("found");
				savedItem = data;
				dataProcess(true);
			}
		});
	}
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl - C to terminate')
})