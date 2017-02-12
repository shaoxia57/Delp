
/*
action: 'fetch', 'upvote', 'downvote'
name: String
*/
function accessMenuItem(action, name, next) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", 'http://192.241.229.194/?'+action+'='+name, true);

	xhr.send();
	
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	  	//console.log(xhr.responseText);
	  	var response = JSON.parse(xhr.responseText);
		next(response);
	  	return response;
	  }
	}
}

function validString(str) {
	return str.replace(/\s/g, "").replace(/&/g, "AMP");
}

var voteSet = new Set();
var itemMap = new Map();

class Dish {
	constructor(str, element, upVotes, downVotes) {
		this.str = str;
		this.element = element;
		this.upVotes = upVotes;
		this.downVotes = downVotes;
	}
	percentage() {
		return this.upVotes/(this.upVotes + this.downVotes);
	}
	isNew() {
		return (this.upVotes + this.downVotes) <= 5;
	}
	isPopular() {
		return (! this.isNew()) && (this.percentage() > 0.8);
	}
}

var Utils = {
	getUpvoteButton: function(str, el, cls) {
		if (cls === undefined) {
			cls = "webcode";
		}
		
		var input_text = `
		<input type="image" 
		alt="upvote" 
		class="${cls}" 
		src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4UlEQVQ4T8WTsQ3CMBBF/8UMABtADYJEMn3YhBG8AWSCmBHYgA2gT5EQQKIMG0CLTA45UhoU4SgUuLPO7+nu60z48ZCL91PVfxmsRA9RFuj75/uvAguXBnsQ+QA2uYxVa8EHbLn2ggYYJfPiPNcHZwdNMIBHLuN+U15UhcQ0s0VBfDQGvke0d4ULcOEJBDRJVFgDtk0LthOgGuuvglsu42H3DpijfK7XnQWe4IHdzE4CBrYnGS9t4J0ET8Gja6CLSjBOle8Z0vZS9lhdAp1NE7VmUNi4C8T6JPWurjl/o2uh3jLOhd5dQweIAAAAAElFTkSuQmCC" />`;
		
		var $input = $.parseHTML(input_text)[1];
		
		var $num = $("<span></span>");
		accessMenuItem("fetch", str, function(obj) {
			$num.text(" " + obj["upVotes"] + " ");
		}.bind(this));
		
		$input.addEventListener("click", function() {
			if (! voteSet.has(str)) {
				accessMenuItem("upvote", str, function(obj) {
					el.children(".counter").text(obj["upVotes"] + " people enjoy this dish!");
					$num.text(" " + obj["upVotes"] + " ")
				}.bind(this));
				voteSet.add(str);
			}
		});
		
		return $($input).add($num);
	},
	getDownvoteButton: function(str, el, cls) {
		if (cls === undefined) {
			cls = "webcode";
		}
		
		var input_text = `
		<input type="image" 
		alt="downvote" 
		class="${cls}" 
		src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3UlEQVQ4T2NkoBAwUqifAWzAcx+bAwwMDPYMDAyODH/+PGBgZt7PwMiogG74fwaGD8yMfxPFNx/fAJPDNAAisx+ny/7/fyC59agi+QZAdDpKbjkCcjUWLxByAUT+gOSWI46UGMDA8OePouSOEw9IDwOo5/8z/JsoteVYAfkG/P+/UWrr0QDyDPjP8JGJ6W8CKDoxEtL7AAOB73+4DzAyMOrDogrmXGxRizUlYhiCFvfIBuFMyuiGMP/7Zyi27dgFdFfgzQsohkCjjSQDQIpBhvz4w2MAS3kkG0AotwIAH9JsEVioprIAAAAASUVORK5CYII=" />`;
		
		var $input = $.parseHTML(input_text)[1];
		var $num = $("<span></span>");
		
		accessMenuItem("fetch", str, function(obj) {
			$num.text(" " + obj["downVotes"] + " ");
		}.bind(this));
		
		$input.addEventListener("click", function() {
			if (! voteSet.has(str)) {
				accessMenuItem("downvote", str, function(obj) {
					el.children(".counter").text(obj["downVotes"] + " people dislike this dish...");
					$num.text(" " + obj["downVotes"] + " ");
				}.bind(this));
				voteSet.add(str);
			}
		});
		return $($input).add($num);
	}
}


//////////////////////////////////
//THUMBS
//////////////////////////////////
let len = $(".menu-item").length;
let canSummarize = false;

$(".menu-item").each(function(index, elm) {
	let str = $(this).children("span.tooltip-target-wrapper").children("a.recipelink").text();
	str = str.replace(/^\s+|\s+$/, "");
	
	let itemDescElement = $(this).children(".item-description-wrapper").children(".item-description");
	
	let upvoteCountElement,	downvoteCountElement;
	
	if (! itemDescElement.length) {
		$(this).children(".item-description-wrapper").append("<div class=\"item-description\"></div>");
		itemDescElement = $(this).children(".item-description-wrapper").children(".item-description");
	}
	
	accessMenuItem("fetch", str, function(obj) {
		$(this).children(".item-description-wrapper").children(".item-description").append("<div class=\"tt-prodwebcode\"><img id=\"" + validString(str) + "_up" + "\" alt=\"AEGG\" class=\"webcode\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4UlEQVQ4T8WTsQ3CMBBF/8UMABtADYJEMn3YhBG8AWSCmBHYgA2gT5EQQKIMG0CLTA45UhoU4SgUuLPO7+nu60z48ZCL91PVfxmsRA9RFuj75/uvAguXBnsQ+QA2uYxVa8EHbLn2ggYYJfPiPNcHZwdNMIBHLuN+U15UhcQ0s0VBfDQGvke0d4ULcOEJBDRJVFgDtk0LthOgGuuvglsu42H3DpijfK7XnQWe4IHdzE4CBrYnGS9t4J0ET8Gja6CLSjBOle8Z0vZS9lhdAp1NE7VmUNi4C8T6JPWurjl/o2uh3jLOhd5dQweIAAAAAElFTkSuQmCC\" width=\"16\" height=\"16\" />&nbsp;<span class=\"counter\">" + obj["upVotes"] + " people enjoy this dish!</span></div>");
		upvoteCountElement = $(this).children(".item-description-wrapper").children(".item-description").children().last();
		$(this).children(".item-description-wrapper").children(".item-description").append("<div class=\"tt-prodwebcode\"><img id=\"" + validString(str) + "_down" + "\" alt=\"AEGG\" class=\"webcode\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3UlEQVQ4T2NkoBAwUqifAWzAcx+bAwwMDPYMDAyODH/+PGBgZt7PwMiogG74fwaGD8yMfxPFNx/fAJPDNAAisx+ny/7/fyC59agi+QZAdDpKbjkCcjUWLxByAUT+gOSWI46UGMDA8OePouSOEw9IDwOo5/8z/JsoteVYAfkG/P+/UWrr0QDyDPjP8JGJ6W8CKDoxEtL7AAOB73+4DzAyMOrDogrmXGxRizUlYhiCFvfIBuFMyuiGMP/7Zyi27dgFdFfgzQsohkCjjSQDQIpBhvz4w2MAS3kkG0AotwIAH9JsEVioprIAAAAASUVORK5CYII=\" width=\"16\" height=\"16\" />&nbsp;<span class=\"counter\">" + obj["downVotes"] + " people dislike this dish...</span></div>");
		downvoteCountElement = $(this).children(".item-description-wrapper").children(".item-description").children().last();
		
		let iconElements = $(this).children("span.tooltip-target-wrapper");
		itemMap.set(str, new Dish(str, iconElements, obj["upVotes"], obj["downVotes"]));
		//console.log(itemMap);
		
		$(this).children("span.tooltip-target-wrapper").append(Utils.getUpvoteButton(str, upvoteCountElement));
		$(this).children("span.tooltip-target-wrapper").append(Utils.getDownvoteButton(str, downvoteCountElement));
		
		if (index === len-1) {
			canSummarize = true;
		}
	}.bind(this));	
});

(function summary() {
	if (canSummarize) {
		let max_dish_name = "";
		let max_dish = null;
		//console.log("number");
		for (let [str, dish] of itemMap) {
			if (max_dish_name === "") {
				max_dish_name = str;
				max_dish = dish;
			} else {
				if (dish.isNew()) {
					dish.element.append("<span style=\"font-weight: bold; color: green\">NEW!  </span>");
				} else {
					if (dish.isPopular()) {
						dish.element.append("<span style=\"font-weight: bold; color: orange\">POPULAR!  </span>");
					}
					if (dish.percentage() > max_dish.percentage()) {
						max_dish_name = str;
						max_dish = dish;
					}
				} 
			}
		}
		if (max_dish_name !== "" && (! max_dish.isNew())) {
			max_dish.element.append("<span style=\"font-weight: bold; color: red\">BEST!!!  </span>")
		}
		//console.log(max_dish_name + " the name");
	} else {
		//console.log("Timeout...");
		setTimeout(summary, 500);
	}
})();